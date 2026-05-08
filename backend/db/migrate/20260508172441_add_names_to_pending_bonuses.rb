class AddNamesToPendingBonuses < ActiveRecord::Migration[8.1]
  def change
    add_column :pending_bonuses, :first_name, :string
    add_column :pending_bonuses, :last_name, :string
  end
end
