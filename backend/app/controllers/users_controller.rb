class UsersController < ApplicationController
  def index
    authorize_request
    @users = User.all
    render json: @users.as_json(methods: :points_balance)
  end

  def create
    @user = User.new(user_params.merge(role: "customer"))
    if @user.save
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { 
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

  def update
    authorize_request
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
    authorize_request
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
    authorize_request
    if @current_user.admin?
      @user = User.find(params[:id])
      @user.destroy
      render json: { message: "User deleted" }
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def add_points
    authorize_request
    if @current_user.admin?
      @user = User.find(params[:id])
      @transaction = @user.transactions.new(
        points: params[:points].to_i,
        transaction_type: 'manual',
        notes: params[:notes] || "Admin adjustment"
      )
      
      if @transaction.save
        render json: { message: "Points added", new_balance: @user.points_balance }
      else
        render json: { errors: @transaction.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  private
  def user_params
    params.permit(
      :email, :password, :password_confirmation, :first_name, :last_name, :phone, :date_of_birth
    )
  end
end
