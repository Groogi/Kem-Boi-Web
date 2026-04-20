class Giveaway < ApplicationRecord
  has_many :giveaway_entries, dependent: :destroy
  has_many :users, through: :giveaway_entries

  validates :title, :start_date, presence: true
end
