class ApplicationController < ActionController::API
  def authorize_request
    header = request.headers["Authorization"]
    header = header.split(" ").last if header
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized and return
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized and return
    end
  end
end
