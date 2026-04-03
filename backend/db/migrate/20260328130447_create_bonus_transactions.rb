class CreateBonusTransactions < ActiveRecord::Migration[8.1]
  def change
    create_table :bonus_transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :bonus_definition, null: false, foreign_key: true
      t.integer :points_amount
      t.string :transaction_type
      t.text :notes
      t.integer :assigned_by_admin_id
      t.index :assigned_by_admin_id

      t.timestamps
    end
  end
end
