class User < ApplicationRecord
  # Authentication
  has_secure_password

  # Roles
  enum :role, { customer: "customer", admin: "admin" }

  # Associations
  has_many :transactions, dependent: :destroy
  has_many :redemptions, dependent: :destroy
  has_many :claimed_rewards, through: :redemptions, source: :reward

  # Referral Tracking
  belongs_to :referred_by, class_name: "User", optional: true
  has_many :referrals, class_name: "User", foreign_key: "referred_by_id"

  # Validations
  validates :first_name, :last_name, presence: true
  validates :email,
            presence: true,
            uniqueness: true,
            format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone,
            format: { with: /\A\d{10,}\z/, message: "must be numeric and at least 10 digits" },
            allow_blank: true
  validates :role, inclusion: { in: %w[admin customer] }, presence: true

  # Points Logic
  def points_balance
    self.points_balance_cache
  end

  def update_points_balance_cache!
    update_column(:points_balance_cache, transactions.sum(:points))
  end

  # Password Reset
  def generate_password_reset_token!
    self.reset_password_token = SecureRandom.urlsafe_base64
    self.reset_password_sent_at = Time.now.utc
    save!
  end

  def password_reset_valid?
    reset_password_sent_at && (reset_password_sent_at + 2.hours > Time.now.utc)
  end

  def reset_password!(password)
    self.reset_password_token = nil
    self.password = password
    save!
  end

  # Callbacks
  after_create :generate_account_id

  # Disabled for demo: PendingBonus flow not implemented yet and currently breaks signup
  # after_create :process_pending_bonuses

  private

  def generate_account_id
    # Simple readable ID for demo
    update_column(:account_id, "kemboi_#{1000 + id}")
  end

  # Disabled for demo: PendingBonus table/model mismatch causes runtime error
  # def process_pending_bonuses
  #   PendingBonus.where(email: self.email).find_each do |pending|
  #     transactions.create!(
  #       points: pending.points_amount || 0,
  #       transaction_type: "bonus",
  #       notes: "Welcome bonus from pending list"
  #     )
  #     pending.destroy
  #   end
  # end
end