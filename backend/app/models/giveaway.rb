class Giveaway < ApplicationRecord
  has_many :giveaway_entries, dependent: :destroy
  has_many :users, through: :giveaway_entries

  validates :title, presence: true
end
