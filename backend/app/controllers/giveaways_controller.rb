class GiveawaysController < ApplicationController
  before_action :authorize_request
  before_action :set_giveaway, only: [:show, :update, :destroy]
  before_action :authorize_admin, only: [:create, :update, :destroy]

  def index
    @giveaways = Giveaway.all
    render json: @giveaways
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
  end

  private

  def set_giveaway
    @giveaway = Giveaway.find(params[:id])
  end

  def authorize_admin
    unless @current_user.admin?
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def giveaway_params
    params.require(:giveaway).permit(:title, :description, :participation_conditions, :start_date, :end_date, :active)
  end
end
