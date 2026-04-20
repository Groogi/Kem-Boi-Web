class GiveawayEntriesController < ApplicationController
  before_action :authorize_request
  before_action :authorize_admin, only: [ :index ]

  def index
    # Admin view: List entries for a specific giveaway
    if params[:giveaway_id]
      giveaway = Giveaway.find(params[:giveaway_id])
      render json: giveaway.giveaway_entries.as_json(include: { user: { only: [ :first_name, :last_name, :email, :account_id ] } })
    else
      render json: { error: "Giveaway ID required" }, status: :bad_request
    end
  end

  def create
    # Customer view: Enter a giveaway
    # Check if already entered
    existing = @current_user.giveaway_entries.find_by(giveaway_id: params[:giveaway_id])
    if existing
      render json: { error: "Already entered this giveaway" }, status: :unprocessable_entity
      return
    end

    entry = @current_user.giveaway_entries.new(giveaway_id: params[:giveaway_id])
    if entry.save
      render json: { message: "Successfully entered giveaway!", entry: entry }, status: :created
    else
      render json: { errors: entry.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def my_entries
    # Customer view: List giveaways I have entered
    render json: @current_user.giveaway_entries.pluck(:giveaway_id)
  end
end
