class CreatePendingBonus < ActiveRecord::Migration[8.1]
  def change
    create_table :pending_bonus do |t|
      t.string :email
      t.references :bonus_definition, null: false, foreign_key: true
      t.integer :points_amount
      t.string :status
      t.datetime :expires_at
      t.integer :assigned_by_admin_id
      t.integer :claimed_by_user_id
      t.datetime :claimed_at
      t.index :assigned_by_admin_id
      t.index :claimed_by_user_id

      t.timestamps
    end
  end
end
