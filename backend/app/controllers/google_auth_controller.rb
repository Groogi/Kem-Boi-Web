class GoogleAuthController < ApplicationController

  def create
    token = params[:token]
    
    if token.blank?
      return render json: { error: "Google token is missing" }, status: :unprocessable_entity
    end

    begin
      # Fetch user info using the access token
      uri = URI('https://www.googleapis.com/oauth2/v3/userinfo')
      req = Net::HTTP::Get.new(uri)
      req['Authorization'] = "Bearer #{token}"
      
      res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
        http.request(req)
      end
      
      unless res.is_a?(Net::HTTPSuccess)
        return render json: { error: "Failed to fetch Google profile" }, status: :unauthorized
      end
      
      payload = JSON.parse(res.body)
      
      # Payload contains email, given_name, family_name, etc.
      email = payload['email']
      first_name = payload['given_name'] || "Google"
      last_name = payload['family_name'] || "User"
      
      user = User.find_by(email: email)
      
      if user.nil?
        # Create a new user with a random secure password
        random_password = SecureRandom.alphanumeric(16)
        user = User.new(
          email: email,
          first_name: first_name,
          last_name: last_name,
          password: random_password,
          password_confirmation: random_password,
          role: 'customer'
        )
        
        unless user.save
          return render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      # Generate JWT for our app
      jwt_token = JsonWebToken.encode(user_id: user.id)
      
      render json: {
        message: "Google Login successful",
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role
        },
        token: jwt_token
      }, status: :ok

    rescue StandardError => e
      render json: { error: "Failed to authenticate with Google: #{e.message}" }, status: :unauthorized
    end
  end
end
