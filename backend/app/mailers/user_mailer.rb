class UserMailer < ApplicationMailer
  def password_reset(user)
    @user = user
    mail to: user.email, subject: "Kem Bơ - Password Reset Instructions"
  end
end
