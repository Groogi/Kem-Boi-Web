class ApplicationMailer < ActionMailer::Base
  # Replace 'YOUR-MAILGUN-DOMAIN.com' with your actual Mailgun Sandbox or verified domain!
  default from: "noreply@mg.demokemboi.com"
  layout "mailer"
end
