class RedemptionsController < ApplicationController
  before_action :authorize_request
  before_action :authorize_admin, only: [ :index, :update, :destroy, :direct_fulfill ]

  def create
    @reward = Reward.find(params[:id])

    ActiveRecord::Base.transaction do
      # Lock the reward row to prevent stock race conditions
      @reward.lock!
      # Lock current user to prevent point balance race conditions
      @current_user.lock!

      # Check points balance (using the cached balance)
      if @current_user.points_balance < @reward.point_cost
        render json: { error: "Insufficient points" }, status: :unprocessable_entity
        return
      end

      # User limit check
      if @reward.limit_per_user.present? && @reward.limit_per_user > 0
        redemption_count = @current_user.redemptions.where(reward_id: @reward.id).count
        if redemption_count >= @reward.limit_per_user
          render json: { error: "You have reached the maximum redemption limit for this reward (#{@reward.limit_per_user} total)" }, status: :unprocessable_entity
          return
        end
      end

      # Global total stock check
      if @reward.total_limit.to_i > 0 && @reward.redemptions_count.to_i >= @reward.total_limit.to_i
        render json: { error: "This reward is sold out!" }, status: :unprocessable_entity
        return
      end

      # Deduct points by creating a transaction
      @current_user.transactions.create!(
        points: -@reward.point_cost,
        transaction_type: "redemption",
        notes: "Redeemed for #{@reward.name}"
      )

      # Create redemption record with uniqueness retry
      @redemption = nil
      max_retries = 5
      
      begin
        @redemption = @current_user.redemptions.create!(
          reward: @reward,
          voucher_code: "KB-#{SecureRandom.hex(4).upcase}",
          status: "pending"
        )
      rescue ActiveRecord::RecordNotUnique, ActiveRecord::RecordInvalid => e
        if e.is_a?(ActiveRecord::RecordNotUnique) || (e.is_a?(ActiveRecord::RecordInvalid) && e.record.errors[:voucher_code].present?)
          max_retries -= 1
          retry if max_retries > 0
        end
        raise e
      end

      render json: {
        message: "Reward claimed successfully!",
        redemption: @redemption,
        point_balance: @current_user.reload.points_balance
      }
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def index
    @redemptions = Redemption.all.includes(:user, :reward).order(created_at: :desc)

    if params[:user_id].present?
      @redemptions = @redemptions.where(user_id: params[:user_id])
    end

    render json: @redemptions.as_json(include: {
      user: { only: [ :id, :first_name, :last_name, :email, :account_id ] },
      reward: { only: [ :id, :name ] }
    })
  end

  def my_redemptions
    target_user = @current_user
    if @current_user.admin? && params[:user_id].present?
      target_user = User.find(params[:user_id])
    end

    @redemptions = target_user.redemptions.includes(:reward).order(created_at: :desc)
    render json: @redemptions.as_json(include: :reward)
  end

  def update
    @redemption = Redemption.find(params[:id])
    if @redemption.update(status: params[:status])
      render json: @redemption
    else
      render json: { errors: @redemption.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @redemption = Redemption.find(params[:id])
    @redemption.destroy
    head :no_content
  end

  # Dedicated staff fulfillment (Deduct points if needed + Mark as used)
  def direct_fulfill
    @user = User.find(params[:user_id])
    @reward = Reward.find(params[:reward_id])

    ActiveRecord::Base.transaction do
      @reward.lock!
      @user.lock!

      # Global limit check
      if @reward.total_limit.to_i > 0 && @reward.redemptions_count.to_i >= @reward.total_limit.to_i
        render json: { error: "This reward is sold out!" }, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end

      # User limit check
      if @reward.limit_per_user.to_i > 0
        user_redemption_count = @user.redemptions.where(reward_id: @reward.id).count
        if user_redemption_count >= @reward.limit_per_user.to_i
          render json: { error: "User has reached the limit for this reward." }, status: :unprocessable_entity
          raise ActiveRecord::Rollback
        end
      end

      if @user.points_balance < @reward.point_cost
        render json: { error: "Insufficient points" }, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end

      # Deduct points if cost > 0
      if @reward.point_cost > 0
         @user.transactions.create!(
           points: -@reward.point_cost,
           transaction_type: "redemption",
           notes: "In-store redemption for #{@reward.name}"
         )
      end

      # Create and fulfill redemption immediately (with retry for voucher collision)
      max_retries = 5
      begin
        @redemption = @user.redemptions.create!(
          reward: @reward,
          voucher_code: "INSTORE-#{SecureRandom.hex(4).upcase}",
          status: "used"
        )
      rescue ActiveRecord::RecordNotUnique, ActiveRecord::RecordInvalid => e
        if e.is_a?(ActiveRecord::RecordNotUnique) || (e.is_a?(ActiveRecord::RecordInvalid) && e.record.errors[:voucher_code].present?)
          max_retries -= 1
          retry if max_retries > 0
        end
        raise e
      end
    end

    if @redemption
      render json: { message: "Redemption successful", user_balance: @user.reload.points_balance }
    end
  end
end
