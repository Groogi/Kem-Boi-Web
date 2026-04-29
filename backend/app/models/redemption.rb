class Redemption < ApplicationRecord
  belongs_to :user
  belongs_to :reward

  validates :status, inclusion: { in: %w[pending used fulfilled archived] }
  validates :voucher_code, presence: true, uniqueness: true

  # Atomic counter updates
  after_create :increment_counters
  after_update :handle_status_change, if: :saved_change_to_status?

  private

  def increment_counters
    reward.increment!(:redemptions_count)
    if status == "used" || status == "fulfilled"
      reward.increment!(:fulfilled_count)
    end
  end

  def handle_status_change
    old_status, new_status = saved_change_to_status
    
    # If it was pending and now it's used/fulfilled, increment fulfilled
    if old_status == "pending" && (new_status == "used" || new_status == "fulfilled")
      reward.increment!(:fulfilled_count)
    end
  end
end
