class Location < ApplicationRecord
  has_many :links, dependent: :destroy
  validates :name, :address_line_1, :suburb, :state, :postcode, presence: true
end
