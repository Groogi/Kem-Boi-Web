class CreatePendingBonus < ActiveRecord::Migration[8.1]
  def change
    create_enum :pending_bonus_status, %w[pending claimed expired cancelled]

    create_table :pending_bonuses do |t|
      t.string :email, null: false
      t.references :bonus_definition, null: false, foreign_key: true
      t.integer :points_amount, null: false
      t.enum :status, enum_type: :pending_bonus_status, null: false
      t.datetime :expires_at
      t.references :assigned_by_admin, foreign_key: { to_table: :users }
      t.references :claimed_by_user, foreign_key: { to_table: :users }
      t.datetime :claimed_at

      t.timestamps
    end
  end
end
