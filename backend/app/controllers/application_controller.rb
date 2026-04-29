class ApplicationController < ActionController::API
  def authorize_request
    header = request.headers["Authorization"]
    token = header.split(" ").last if header
    
    if token.blank?
      render json: { error: "Missing token" }, status: :unauthorized
      return
    end

    begin
      @decoded = JsonWebToken.decode(token)
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: [ e.message ] }, status: :unauthorized
      return
    rescue JWT::DecodeError => e
      render json: { errors: [ e.message ] }, status: :unauthorized
      return
    end
  end

  def authorize_admin
    unless @current_user&.role == "admin"
      render json: { error: "Unauthorized" }, status: :unauthorized
      return
    end
  end
end
