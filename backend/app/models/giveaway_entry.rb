class GiveawayEntry < ApplicationRecord
  belongs_to :giveaway
  belongs_to :user

  validates :user_id, uniqueness: { scope: :giveaway_id, message: "has already entered this giveaway" }
end
