class PasswordsController < ApplicationController
  def forgot
    if params[:email].blank?
      return render json: { error: "Email not present" }, status: :unprocessable_entity
    end

    user = User.find_by(email: params[:email].to_s.downcase)

    if user.present?
      user.generate_password_reset_token!
      UserMailer.password_reset(user).deliver_now
      render json: { message: "If your email exists in our system, you will receive a reset token shortly." }, status: :ok
    else
      # We return :ok even if user not found to prevent email harvesting
      render json: { message: "If your email exists in our system, you will receive a reset token shortly." }, status: :ok
    end
  end

  def reset
    token = params[:token].to_s

    if params[:email].blank?
      return render json: { error: "Email not present" }, status: :unprocessable_entity
    end

    user = User.find_by(email: params[:email].to_s.downcase)

    if user.present? && ActiveSupport::SecurityUtils.secure_compare(user.reset_password_token, token) && user.password_reset_valid?
      if user.reset_password!(params[:password])
        render json: { message: "Password updated successfully!" }, status: :ok
      else
        render json: { error: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Link not valid or expired. Try generating a new one." }, status: :not_found
    end
  end
end
