class AuthenticationController < ApplicationController
  # POST /login
  def login
    @user = User.find_by_email(params[:email].to_s.downcase)
    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: {
        token: token,
        exp: time.strftime("%m-%d-%Y %H:%M"),
        email: @user.email,
        first_name: @user.first_name,
        last_name: @user.last_name,
        account_id: @user.account_id,
        role: @user.role,
        points_balance: @user.points_balance
      }, status: :ok
    else
      render json: { error: "invalid credentials" }, status: :unauthorized
    end
  end
end
