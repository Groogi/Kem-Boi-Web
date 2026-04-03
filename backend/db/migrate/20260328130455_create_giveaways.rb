class CreateGiveaways < ActiveRecord::Migration[8.1]
  def change
    create_table :giveaways do |t|
      t.string :title
      t.text :description
      t.text :participation_conditions
      t.date :start_date
      t.date :end_date
      t.boolean :active

      t.timestamps
    end
  end
end
