class AddNameAndMemberIdToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :name, :string
    add_column :users, :member_id, :string
  end
end
