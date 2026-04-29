class CreateRewards < ActiveRecord::Migration[8.1]
  def change
    create_table :rewards do |t|
      t.string :name
      t.text :description
      t.integer :point_cost
      t.boolean :active
      t.string :images

      t.timestamps
    end
  end
end
