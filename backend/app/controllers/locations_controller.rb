class LocationsController < ApplicationController
  before_action :authorize_request, except: [:index, :show]
  before_action :authorize_admin, except: [:index, :show]
  before_action :set_location, only: [:show, :update, :destroy]

  # GET /locations
  def index
    @locations = Location.all
    render json: @locations
  end

  # GET /locations/1
  def show
    render json: @location
  end

  # POST /locations
  def create
    @location = Location.new(location_params)
    if @location.save
      render json: @location, status: :created
    else
      render json: { errors: @location.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /locations/1
  def update
    if @location.update(location_params)
      render json: @location
    else
      render json: { errors: @location.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /locations/1
  def destroy
    @location.destroy
    head :no_content
  end

  private

  def set_location
    @location = Location.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Location not found' }, status: :not_found
  end

  def location_params
    params.require(:location).permit(:name, :address_line_1, :suburb, :state, :postcode, :map_url, :active)
  end

  def authorize_admin
    render json: { error: 'Unauthorized' }, status: :unauthorized unless @current_user.role == 'admin'
  end
end
