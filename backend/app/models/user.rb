class User < ApplicationRecord
  # Roles and Authentication
  has_secure_password
  enum :role, { customer: "customer", admin: "admin" }

  # Associations
  has_many :transactions, dependent: :destroy
  has_many :bonus_transactions, dependent: :destroy
  has_many :claimed_bonuses, class_name: "PendingBonus", foreign_key: "claimed_by_user_id", dependent: :nullify
  has_many :redemptions, dependent: :destroy
  has_many :claimed_rewards, through: :redemptions, source: :reward

  # Referral Tracking
  belongs_to :referred_by, class_name: "User", optional: true
  has_many :referrals, class_name: "User", foreign_key: "referred_by_id"

  # Validations
  validates :first_name, :last_name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone, format: { with: /\A\d{10,}\z/, message: "must be numeric and at least 10 digits" }, allow_blank: true
  validates :role, inclusion: { in: %w[admin customer] }, presence: true

  # Points Ledger Logic
  def points_balance
    self.points_balance_cache
  end

  def update_points_balance_cache!
    update_column(:points_balance_cache, transactions.sum(:points))
  end

  # Password Reset Logic
  def generate_password_reset_token!
    self.reset_password_token = SecureRandom.urlsafe_base64
    self.reset_password_sent_at = Time.now.utc
    save!
  end

  def password_reset_valid?
    (reset_password_sent_at + 2.hours) > Time.now.utc
  end

  def reset_password!(password)
    self.reset_password_token = nil
    self.password = password
    save!
  end

  # Registration Hook
  after_create :generate_account_id
  after_create :process_pending_bonuses

  private

  def generate_account_id
    # Format: kemboi_1001, kemboi_1002, etc.
    update_column(:account_id, "kemboi_#{1000 + self.id}")
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
