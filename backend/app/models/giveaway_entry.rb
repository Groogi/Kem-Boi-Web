class GiveawayEntry < ApplicationRecord
  belongs_to :user
  belongs_to :giveaway
end
