class CreateRedemptions < ActiveRecord::Migration[8.1]
  def change
    create_table :redemptions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :reward, null: false, foreign_key: true
      t.string :voucher_code
      t.string :status

      t.timestamps
    end
  end
end
