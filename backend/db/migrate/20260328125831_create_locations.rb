class CreateLocations < ActiveRecord::Migration[8.1]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :address_line_1
      t.string :suburb
      t.string :state
      t.string :postcode
      t.string :map_url
      t.boolean :active

      t.timestamps
    end
  end
end
