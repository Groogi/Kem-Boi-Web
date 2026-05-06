class TransactionsController < ApplicationController
  before_action :authorize_request
  before_action :authorize_admin, only: [ :quick_add, :user_transactions ]

  def index
    if params[:user_id].present? && @current_user.admin?
      @user = User.find(params[:user_id])
      render json: @user.transactions.order(created_at: :desc)
    elsif params[:email].present? && @current_user.admin?
      # Return pending bonuses for this email if the user doesn't exist yet
      pending = PendingBonus.where(email: params[:email].to_s.downcase).order(created_at: :desc)
      render json: pending.map { |pb| 
        { 
          id: pb.id, 
          points: pb.points_amount, 
          created_at: pb.created_at, 
          transaction_type: "pending", 
          notes: "Pending registration" 
        } 
      }
    else
      render json: @current_user.transactions.order(created_at: :desc)
    end
  end

  def quick_add
    user = User.where("LOWER(email) = ?", params[:email].to_s.downcase).first
    if user
      transaction = user.transactions.new(points: params[:points].to_i, transaction_type: "manual", notes: "Quick Admin Entry")
      if transaction.save
        render json: { message: "Points added to existing user", new_balance: user.points_balance }
      else
        render json: { errors: transaction.errors.full_messages }, status: :unprocessable_entity
      end
    else
      # User doesn't exist, create a pending bonus
      pb = PendingBonus.create(email: params[:email], points_amount: params[:points].to_i)
      UserMailer.pending_bonus_notification(params[:email], params[:points].to_i).deliver_now
      render json: { message: "User not found. Points saved as pending bonus.", pending: pb }
    end
  end

  def user_transactions
    user = User.find(params[:id])
    render json: user.transactions.order(created_at: :desc)
  end

  private

  def transaction_params
    # We permit points (should be negative for redemption) and transaction_type
    params.require(:transaction).permit(:points, :transaction_type, :notes)
  end
end
