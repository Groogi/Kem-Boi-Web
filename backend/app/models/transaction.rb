class Transaction < ApplicationRecord
  belongs_to :user

  # Validations
  validates :points, presence: true, numericality: { only_integer: true }
  validates :transaction_type, presence: true, inclusion: { in: %w[bonus manual redemption] }

  # Redemption Guard
  validate :sufficient_points_for_redemption, if: :redemption?

  after_create :update_user_cache
  after_destroy :update_user_cache

  def update_user_cache
    user.update_points_balance_cache!
  end

  def redemption?
    transaction_type == "redemption" || (points.present? && points < 0)
  end

  def sufficient_points_for_redemption
    return if user.nil?

    # We use abs because points are stored as negative for redemptions
    required_points = points.abs
    if user.points_balance < required_points
      errors.add(:points, "Insufficient balance for this redemption (Current: #{user.points_balance}, Required: #{required_points})")
    end
  end
end
