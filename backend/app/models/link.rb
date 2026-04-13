class Link < ApplicationRecord
  belongs_to :location, optional: true
end
