class AddUniqueIndexesToUsers < ActiveRecord::Migration[8.1]
  def change
    remove_index :users, :email, if_exists: true
    remove_index :users, :account_id, if_exists: true

    add_index :users, :email, unique: true
    add_index :users, :account_id, unique: true
  end
end
