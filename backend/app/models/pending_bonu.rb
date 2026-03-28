class PendingBonu < ApplicationRecord
  belongs_to :bonus_definition
  belongs_to :admin, class_name: 'User', foreign_key: 'assigned_by_admin_id', optional: true
  belongs_to :claimed_by, class_name: 'User', foreign_key: 'claimed_by_user_id', optional: true
end
