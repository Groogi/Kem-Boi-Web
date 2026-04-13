class User < ApplicationRecord
  has_secure_password

  enum :role, {
    customer: "customer",
    admin: "admin"
  }

  has_many :bonus_transactions
  has_many :claimed_bonuses, class_name: "PendingBonus", foreign_key: "claimed_by_user_id"

  validates :email, presence: true, uniqueness: true
  validates :role, inclusion: { in: %w[admin customer] }, presence: true
end
