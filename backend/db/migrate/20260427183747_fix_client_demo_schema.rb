class FixClientDemoSchema < ActiveRecord::Migration[8.1]
  def up
    rename_table :pending_bonus, :pending_bonuses
    remove_column :users, :name, :string
    
    execute "UPDATE users SET first_name = 'Unknown' WHERE first_name IS NULL"
    execute "UPDATE users SET last_name = 'Unknown' WHERE last_name IS NULL"
    
    change_column_null :users, :first_name, false
    change_column_null :users, :last_name, false
  end

  def down
    change_column_null :users, :first_name, true
    change_column_null :users, :last_name, true
    
    add_column :users, :name, :string
    rename_table :pending_bonuses, :pending_bonus
  end
end
