class CreateGiveaways < ActiveRecord::Migration[8.1]
  def change
    create_table :giveaways do |t|
      t.string :title, null: false
      t.text :description
      t.text :participation_conditions
      t.date :start_date, null: false
      t.date :end_date
      t.boolean :active, null: false

      t.timestamps
    end
  end
end
