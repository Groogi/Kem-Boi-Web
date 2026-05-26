class UserMailer < ApplicationMailer
  def password_reset(user)
    @user = user
    mail to: user.email, subject: "Kem Bơ - Password Reset Instructions"
  end

  def pending_bonus_notification(email, points, name = nil)
    @points = points
    @email = email
    @name = name
    mail to: email, subject: "You've received points at Kem Bơ! 🥑"
  end
end
