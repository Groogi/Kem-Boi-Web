class AddTotalLimitToRewards < ActiveRecord::Migration[8.1]
  def change
    add_column :rewards, :total_limit, :integer, default: 0
  end
end
