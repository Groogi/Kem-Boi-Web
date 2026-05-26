class ApplicationMailer < ActionMailer::Base
  # Replace 'YOUR-MAILGUN-DOMAIN.com' with your actual Mailgun Sandbox or verified domain!
  default from: ENV.fetch("MAILER_FROM", "noreply@example.com")
  layout "mailer"
end
