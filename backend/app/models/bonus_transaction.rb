class BonusTransaction < ApplicationRecord
  belongs_to :user
  belongs_to :bonus_definition
  belongs_to :admin, class_name: 'User', foreign_key: 'assigned_by_admin_id', optional: true
end
