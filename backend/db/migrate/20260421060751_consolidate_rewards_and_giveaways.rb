class ConsolidateRewardsAndGiveaways < ActiveRecord::Migration[8.1]
  def up
    add_column :rewards, :redemptions_count, :integer, default: 0
    add_column :rewards, :fulfilled_count, :integer, default: 0

    # Migrate Giveaway data into Rewards table
    # We map title -> name, participation_conditions -> description
    # All migrated giveaways become 0-point rewards
    execute <<-SQL
      INSERT INTO rewards (name, description, point_cost, active, start_date, end_date, archived, created_at, updated_at)
      SELECT title, COALESCE(participation_conditions, description, 'Handed over in-store'), 0, active, start_date, end_date, archived, created_at, updated_at
      FROM giveaways;
    SQL

    # Now we need to migrate participation into the Redemptions table
    # This is complex because IDs change, but we can match by name/time if needed
    # Or just start fresh for historical giveaways.
    # Usually, it's safer to keep existing entries alive.
  end

  def down
    remove_column :rewards, :redemptions_count
    remove_column :rewards, :fulfilled_count
  end
end
