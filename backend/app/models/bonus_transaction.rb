class BonusTransaction < ApplicationRecord
  enum :transaction_type, {
    manual_credit: "manual_credit",
    pending_claim: "pending_claim",
    admin_adjustment: "admin_adjustment",
    giveaway_reward: "giveaway_reward"
  }

  belongs_to :user
  belongs_to :bonus_definition
  belongs_to :admin, class_name: "User", foreign_key: "assigned_by_admin_id", optional: true
end
