class CreateBonusDefinitions < ActiveRecord::Migration[8.1]
  def change
    create_table :bonus_definitions do |t|
      t.string :title, null: false
      t.text :description
      t.text :conditions
      t.integer :points_required, null: false
      t.boolean :active, null: false
      t.integer :display_order

      t.timestamps
    end
  end
end
