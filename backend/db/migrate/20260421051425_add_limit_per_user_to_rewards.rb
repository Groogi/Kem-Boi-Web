class AddLimitPerUserToRewards < ActiveRecord::Migration[8.1]
  def change
    add_column :rewards, :limit_per_user, :integer
  end
end
