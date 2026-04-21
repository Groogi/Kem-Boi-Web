class AddArchivedToRewardsAndGiveaways < ActiveRecord::Migration[8.1]
  def change
    add_column :rewards, :archived, :boolean, default: false, null: false
    add_column :giveaways, :archived, :boolean, default: false, null: false
  end
end
