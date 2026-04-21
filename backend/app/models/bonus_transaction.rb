class BonusTransaction < ApplicationRecord
  belongs_to :user
  belongs_to :bonus_definition
  belongs_to :assigned_by_admin, class_name: "User", optional: true

  validates :points_amount, presence: true
end
