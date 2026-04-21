class ProductionHardeningAndOptimization < ActiveRecord::Migration[8.1]
  def change
    # Add cached points balance to users for performance
    add_column :users, :points_balance_cache, :integer, default: 0, null: false

    # Add unique index to vouchers to prevent collisions
    add_index :redemptions, :voucher_code, unique: true

    # Backfill points_balance_cache
    reversible do |dir|
      dir.up do
        User.find_each do |user|
          user.update_column(:points_balance_cache, user.transactions.sum(:points))
        end
      end
    end
  end
end
