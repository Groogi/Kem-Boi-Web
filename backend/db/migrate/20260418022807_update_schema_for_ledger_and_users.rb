class UpdateSchemaForLedgerAndUsers < ActiveRecord::Migration[8.1]
  def change
    # 1. Update Users table
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :phone, :string

    # 2. Update Giveaways table default
    change_column_default :giveaways, :active, from: nil, to: false
    # Clean up existing nulls if any (safety measure)
    change_column_null :giveaways, :active, false, false

    # 3. Create generic Ledger Transactions table
    create_table :transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :points, null: false
      t.string :transaction_type, null: false # e.g., 'bonus', 'manual', 'redemption'
      t.text :notes

      t.timestamps
    end
  end
end
