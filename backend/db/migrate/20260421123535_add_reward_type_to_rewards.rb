class AddRewardTypeToRewards < ActiveRecord::Migration[8.1]
  def change
    add_column :rewards, :reward_type, :string, default: "standard"
  end
end
