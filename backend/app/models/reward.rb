class Reward < ApplicationRecord
  has_many :redemptions, dependent: :destroy
  has_many :users, through: :redemptions

  validates :name, :point_cost, :start_date, presence: true
  validates :end_date, presence: true, unless: :never_expires?
  validates :point_cost, numericality: { greater_than_or_equal_to: 0 }
  validates :reward_type, inclusion: { in: %w[standard referral] }

  validate :end_date_after_start_date
  validate :at_least_one_field_present

  # Logic for nightly cleanup: Dedicated background task
  # instead of one job per reward save.

  def end_date_after_start_date
    return if end_date.blank? || start_date.blank?
    if end_date < start_date
      errors.add(:end_date, "must be after the start date")
    end
  end

  def at_least_one_field_present
    if (point_cost.blank? || point_cost == 0) && description.blank?
      errors.add(:base, "Reward must have at least a description or a point cost greater than 0")
    end
  end
end
