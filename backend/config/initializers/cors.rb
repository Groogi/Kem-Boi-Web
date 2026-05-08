# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Allow frontend URL from environment variable
    origins do |source, env|
      app_domain = ENV.fetch("APP_DOMAIN", "localhost:5173")
      # Match if the source is the app domain (with or without https)
      source.include?(app_domain) || source.include?("localhost:5173")
    end

    resource "*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ]
  end
end
