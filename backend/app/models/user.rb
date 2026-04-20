class User < ApplicationRecord
  # Roles and Authentication
  has_secure_password
  enum :role, { customer: "customer", admin: "admin" }

  # Associations
  has_many :transactions, dependent: :destroy
  has_many :claimed_bonuses, class_name: "PendingBonus", foreign_key: "claimed_by_user_id"
  has_many :giveaway_entries, dependent: :destroy
  has_many :entered_giveaways, through: :giveaway_entries, source: :giveaway
  has_many :redemptions, dependent: :destroy
  has_many :claimed_rewards, through: :redemptions, source: :reward

  # Validations
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone, format: { with: /\A\d{10,}\z/, message: "must be numeric and at least 10 digits" }, allow_blank: true
  validates :role, inclusion: { in: %w[admin customer] }, presence: true

  # Points Ledger Logic
  def points_balance
    transactions.sum(:points)
  end

  # Registration Hook
  before_create :generate_account_id
  after_create :process_pending_bonuses

  private

  def generate_account_id
    # Format: account_1001, account_1002, etc.
    last_id = User.maximum(:id) || 0
    self.account_id = "account_#{1000 + last_id + 1}"
  end

  def process_pending_bonuses
    # Find bonuses associated with this email
    # NOTE: Assuming PendingBonus table has an email column as per schema.rb line 82
    # If the table is pluralized as 'pending_bonuses', ensure the model matches.
    PendingBonus.where(email: self.email).find_each do |pending|
      transactions.create!(
        points: pending.points_amount || 0,
        transaction_type: "bonus",
        notes: "Welcome bonus from pending list"
      )
      # Delete or update status to 'claimed'
      pending.destroy
    end
  end
end
