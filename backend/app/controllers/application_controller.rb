class ApplicationController < ActionController::API
  def authorize_request
    header = request.headers["Authorization"]
    header = header.split(" ").last if header
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: [ e.message ] }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: [ e.message ] }, status: :unauthorized
    end
  end

  def authorize_admin
    unless @current_user&.role == "admin"
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
