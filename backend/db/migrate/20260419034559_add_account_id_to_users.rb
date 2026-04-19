class AddAccountIdToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :account_id, :string
    add_index :users, :account_id
  end
end
