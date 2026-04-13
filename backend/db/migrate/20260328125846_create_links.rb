class CreateLinks < ActiveRecord::Migration[8.1]
  def change
    create_table :links do |t|
      t.string :label, null: false
      t.string :url, null: false
      t.string :link_type
      t.references :location, foreign_key: true
      t.boolean :active, null: false

      t.timestamps
    end
  end
end
