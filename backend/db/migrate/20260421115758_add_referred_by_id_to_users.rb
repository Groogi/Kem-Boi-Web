class AddReferredByIdToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :referred_by_id, :integer
  end
end
