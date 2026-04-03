class CreateBonusDefinitions < ActiveRecord::Migration[8.1]
  def change
    create_table :bonus_definitions do |t|
      t.string :title
      t.text :description
      t.text :conditions
      t.integer :points_required
      t.boolean :active
      t.integer :display_order

      t.timestamps
    end
  end
end
