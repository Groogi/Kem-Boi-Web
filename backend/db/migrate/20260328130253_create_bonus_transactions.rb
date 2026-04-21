class CreateBonusTransactions < ActiveRecord::Migration[8.1]
  def change
    create_table :bonus_transactions do |t|
      t.integer :assigned_by_admin_id
      t.references :bonus_definition, null: false, foreign_key: true
      t.text :notes
      t.integer :points_amount
      t.string :transaction_type
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :bonus_transactions, :assigned_by_admin_id
  end
end
