class CreateBonusTransactions < ActiveRecord::Migration[8.1]
  def change
    create_enum :bonus_transaction_type, %w[manual_credit pending_claim admin_adjustment giveaway_reward]

    create_table :bonus_transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :bonus_definition, null: false, foreign_key: true
      t.integer :points_amount, null: false
      t.enum :transaction_type, enum_type: :bonus_transaction_type, null: false
      t.text :notes
      t.references :assigned_by_admin, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
