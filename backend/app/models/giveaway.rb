class Giveaway < ApplicationRecord
  validates :title, :start_date, presence: true
end
