class PendingBonus < ApplicationRecord
  self.table_name = "pending_bonuses"
  belongs_to :bonus_definition, optional: true
end
