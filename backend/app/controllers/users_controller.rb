class UsersController < ApplicationController
  before_action :authorize_request, except: [ :create ]
  before_action :authorize_admin, only: [ :index, :admin_update, :destroy, :add_points, :quick_add_points ]

  def index
    render json: User.all.as_json(methods: :points_balance)
  end

  def profile
    render json: @current_user.as_json(methods: :points_balance)
  end

  def create
    props = user_params.to_h

    @user = User.new(props.merge(role: "customer"))

    referral_code = params[:referral_code].to_s.strip.upcase

    ActiveRecord::Base.transaction do
      referrer = nil
      redemption = nil

      if referral_code.present?
        # Find and lock the redemption immediately to prevent race conditions
        redemption = Redemption.joins(:reward)
                               .where(rewards: { reward_type: "referral" })
                               .lock("FOR UPDATE")
                               .find_by(voucher_code: referral_code)

        if redemption && redemption.status == "pending"
          referrer = redemption.user
          @user.referred_by_id = referrer.id
        else
          render json: { errors: [ "Invalid or expired referral code" ] }, status: :unprocessable_entity
          raise ActiveRecord::Rollback
        end
      end

      if @user.save
        # Process Referral Rewards
        if referrer && redemption
          # Referrer Reward (+100)
          referrer.transactions.create!(
            points: 100,
            transaction_type: "bonus",
            notes: "Referral Bonus for inviting #{@user.email}"
          )
          # New Member Reward (+50)
          @user.transactions.create!(
            points: 50,
            transaction_type: "bonus",
            notes: "Welcome Gift from referral by #{referrer.first_name}"
          )
          # Finalize Voucher
          redemption.update!(status: "used")
        end

        token = JsonWebToken.encode(user_id: @user.id)
        time = Time.now + 24.hours.to_i
        render json: {
          id: @user.id,
          token: token,
          exp: time.strftime("%m-%d-%Y %H:%M"),
          email: @user.email,
          first_name: @user.first_name,
          last_name: @user.last_name,
          account_id: @user.account_id,
          points_balance: @user.points_balance
        }, status: :created
      else
        render json: { errors: @user.errors.full_messages },
               status: :unprocessable_entity
      end
    end
  rescue ActiveRecord::RecordNotUnique => e
    render json: { errors: [ "Email has already been taken" ] }, status: :conflict
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: [ e.message ] }, status: :unprocessable_entity
  end

  def update
    if @current_user.update(user_params)
      render json: {
        email: @current_user.email,
        first_name: @current_user.first_name,
        last_name: @current_user.last_name,
        phone: @current_user.phone,
        date_of_birth: @current_user.date_of_birth,
        account_id: @current_user.account_id,
        points_balance: @current_user.points_balance
      }, status: :ok
    else
      render json: { errors: @current_user.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  def admin_update
    if @current_user.admin?
      @user = User.find(params[:id])
      if @user.update(user_params)
        render json: @user.as_json(methods: :points_balance)
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def destroy
    if @current_user.admin?
      @user = User.find(params[:id])
      @user.destroy
      render json: { message: "User deleted" }
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def add_points
    @user = User.find(params[:id])
    @transaction = @user.transactions.new(
      points: params[:points].to_i,
      transaction_type: "manual",
      notes: params[:notes] || "Admin Manual Addition"
    )

    if @transaction.save
      render json: { message: "Points added", new_balance: @user.points_balance }
    else
      render json: { errors: @transaction.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def quick_add_points
    email = params[:email].to_s.strip.downcase
    points = params[:points].to_i

    @user = User.find_by(email: email)

    if @user
      @transaction = @user.transactions.new(
        points: points,
        transaction_type: "manual",
        notes: "Staff Quick Add"
      )

      if @transaction.save
        render json: { message: "Points added", new_balance: @user.points_balance }
      else
        render json: { errors: @transaction.errors.full_messages }, status: :unprocessable_entity
      end
    else
      # If user doesn't exist, we could return error or create a placeholder/pending bonus
      render json: { error: "User not found. Please register member first." }, status: :not_found
    end
  end

  private
  def user_params
    params.permit(
      :email, :password, :password_confirmation, :first_name, :last_name, :phone, :date_of_birth, :referral_code
    )
  end
end
