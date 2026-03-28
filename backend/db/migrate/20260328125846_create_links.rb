class CreateLinks < ActiveRecord::Migration[8.1]
  def change
    create_table :links do |t|
      t.string :label
      t.string :url
      t.string :link_type
      t.references :location, null: false, foreign_key: true
      t.boolean :active

      t.timestamps
    end
  end
end
