class AuthenticationController < ApplicationController
  # POST /login
  def login
    @user = User.find_by_email(params[:email])
    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                     email: @user.email, name: @user.name }, status: :ok
    else
      render json: { error: 'invalid credentials' }, status: :unauthorized
    end
  end
end
