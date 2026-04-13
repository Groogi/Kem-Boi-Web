class CreateLocations < ActiveRecord::Migration[8.1]
  def change
    create_table :locations do |t|
      t.string :name, null: false
      t.string :address_line_1, null: false
      t.string :suburb, null: false
      t.string :state, null: false
      t.string :postcode, null: false
      t.string :map_url
      t.boolean :active, null: false

      t.timestamps
    end
  end
end
