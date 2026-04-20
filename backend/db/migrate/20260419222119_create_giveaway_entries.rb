class CreateGiveawayEntries < ActiveRecord::Migration[8.1]
  def change
    create_table :giveaway_entries do |t|
      t.references :user, null: false, foreign_key: true
      t.references :giveaway, null: false, foreign_key: true

      t.timestamps
    end
  end
end
