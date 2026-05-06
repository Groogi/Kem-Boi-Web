class AddNeverExpiresToRewards < ActiveRecord::Migration[8.1]
  def change
    add_column :rewards, :never_expires, :boolean, default: false
  end
end
