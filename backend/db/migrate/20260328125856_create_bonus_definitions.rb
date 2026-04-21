class CreateBonusDefinitions < ActiveRecord::Migration[8.1]
  def change
    create_table :bonus_definitions do |t|
      t.boolean :active
      t.text :conditions
      t.text :description
      t.integer :display_order
      t.integer :points_required
      t.string :title

      t.timestamps
    end
  end
end
