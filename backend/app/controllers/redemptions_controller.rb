class RedemptionsController < ApplicationController
  before_action :authorize_request

  def create
    @reward = Reward.find(params[:id])
    
    if @current_user.points_balance < @reward.point_cost
      render json: { error: "Insufficient points" }, status: :unprocessable_entity
      return
    end

    ActiveRecord::Base.transaction do
      # Deduct points by creating a transaction
      @current_user.transactions.create!(
        points: -@reward.point_cost,
        transaction_type: "redemption",
        notes: "Redeemed for #{@reward.name}"
      )

      # Create redemption record
      @redemption = @current_user.redemptions.create!(
        reward: @reward,
        voucher_code: "KB-#{SecureRandom.hex(3).upcase}",
        status: "pending"
      )

      render json: { 
        message: "Reward claimed successfully!", 
        redemption: @redemption,
        point_balance: @current_user.points_balance 
      }
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def index
    authorize_admin
    @redemptions = Redemption.all.includes(:user, :reward).order(created_at: :desc)
    render json: @redemptions.as_json(include: { 
      user: { only: [:id, :first_name, :last_name, :email, :account_id] },
      reward: { only: [:id, :name] }
    })
  end

  def my_redemptions
    @redemptions = @current_user.redemptions.includes(:reward).order(created_at: :desc)
    render json: @redemptions.as_json(include: :reward)
  end

  def update
    authorize_admin
    @redemption = Redemption.find(params[:id])
    if @redemption.update(status: params[:status])
      render json: @redemption
    else
      render json: { errors: @redemption.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    authorize_admin
    @redemption = Redemption.find(params[:id])
    @redemption.destroy
    head :no_content
  end
end
