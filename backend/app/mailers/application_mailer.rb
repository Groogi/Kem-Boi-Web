class ApplicationMailer < ActionMailer::Base
  # Replace 'YOUR-MAILGUN-DOMAIN.com' with your actual Mailgun Sandbox or verified domain!
  default from: "demo@sandbox9e69607e92d144ba96afe470f7fe35da.mailgun.org"
  layout "mailer"
end
