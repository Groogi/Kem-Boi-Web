class RewardsController < ApplicationController
  before_action :authorize_request
  before_action :authorize_admin, only: [ :create, :update, :destroy ]

  def index
    # Passive cleanup: Archive expired rewards instead of deleting

    @rewards = Reward.where(archived: false)
    render json: @rewards
  end

  def create
    @reward = Reward.new(reward_params)
    if @reward.save
      render json: @reward, status: :created
    else
      render json: @reward.errors, status: :unprocessable_entity
    end
  end

  def update
    @reward = Reward.find(params[:id])
    if @reward.update(reward_params)
      render json: @reward
    else
      render json: @reward.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @reward = Reward.find(params[:id])
    @reward.destroy
    head :no_content
  end

  private

  def reward_params
    params.require(:reward).permit(:name, :description, :point_cost, :active, :images, :start_date, :end_date, :limit_per_user, :reward_type, :total_limit)
  end
end
