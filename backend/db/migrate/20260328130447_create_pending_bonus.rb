class CreatePendingBonus < ActiveRecord::Migration[8.1]
  def change
    create_table :pending_bonus do |t|
      t.integer :assigned_by_admin_id
      t.references :bonus_definition, null: false, foreign_key: true
      t.datetime :claimed_at
      t.integer :claimed_by_user_id
      t.string :email
      t.datetime :expires_at
      t.integer :points_amount
      t.string :status

      t.timestamps
    end
    add_index :pending_bonus, :assigned_by_admin_id
    add_index :pending_bonus, :claimed_by_user_id
  end
end
