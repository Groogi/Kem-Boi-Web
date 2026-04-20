class GiveawaysController < ApplicationController
  before_action :authorize_request, except: [ :index, :show ]
  before_action :authorize_admin, except: [ :index, :show ]
  before_action :set_giveaway, only: [ :show, :update, :destroy ]

  def index
    @giveaways = Giveaway.all
    
    # Try to identify user if token is present, but don't fail if not
    header = request.headers["Authorization"]
    token = header.split(" ").last if header
    begin
      decoded = JsonWebToken.decode(token)
      user = User.find_by(id: decoded[:user_id])
      Rails.logger.info "Giveaways index called for user_id: #{user&.id}"
    rescue => e
      Rails.logger.error "Token decode failed in Giveaways index: #{e.message}"
      user = nil
    end

    if user
      render json: @giveaways.map { |giveaway| 
        giveaway.attributes.merge("isJoined" => user.giveaway_entries.exists?(giveaway_id: giveaway.id))
      }
    else
      render json: @giveaways
    end
  end

  def show
    render json: @giveaway
  end

  def create
    @giveaway = Giveaway.new(giveaway_params)
    if @giveaway.save
      render json: @giveaway, status: :created
    else
      render json: { errors: @giveaway.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @giveaway.update(giveaway_params)
      render json: @giveaway
    else
      render json: { errors: @giveaway.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @giveaway.destroy
    head :no_content
  end

  private

  def set_giveaway
    @giveaway = Giveaway.find(params[:id])
  end

  def giveaway_params
    params.require(:giveaway).permit(:title, :description, :participation_conditions, :start_date, :end_date, :active)
  end
end
