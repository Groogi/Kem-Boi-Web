class TransactionsController < ApplicationController
  before_action :authorize_request

  def index
    render json: @current_user.transactions.order(created_at: :desc)
  end

  def create
    @transaction = @current_user.transactions.build(transaction_params)
    
    if @transaction.save
      render json: { 
        message: "Transaction successful", 
        transaction: @transaction,
        new_balance: @current_user.points_balance 
      }, status: :created
    else
      render json: { errors: @transaction.errors.full_messages }, 
             status: :unprocessable_entity
    end
  end

  def quick_add
    user = User.where("LOWER(email) = ?", params[:email].to_s.downcase).first
    if user
      transaction = user.transactions.new(points: params[:points].to_i, transaction_type: 'manual', notes: "Quick Admin Entry")
      if transaction.save
        render json: { message: "Points added to existing user", new_balance: user.points_balance }
      else
        render json: { errors: transaction.errors.full_messages }, status: :unprocessable_entity
      end
    else
      # User doesn't exist, create a pending bonus
      pb = PendingBonus.create(email: params[:email], points_amount: params[:points].to_i)
      render json: { message: "User not found. Points saved as pending bonus.", pending: pb }
    end
  end

  def user_transactions
    if @current_user.admin?
      user = User.find(params[:id])
      render json: user.transactions.order(created_at: :desc)
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  private

  def transaction_params
    # We permit points (should be negative for redemption) and transaction_type
    params.require(:transaction).permit(:points, :transaction_type, :notes)
  end
end
