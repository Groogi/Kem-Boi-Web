class AddAddressLine2ToLocations < ActiveRecord::Migration[8.1]
  def change
    add_column :locations, :address_line_2, :string
  end
end
