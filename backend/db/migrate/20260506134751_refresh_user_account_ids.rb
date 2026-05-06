class RefreshUserAccountIds < ActiveRecord::Migration[8.1]
  def up
    User.find_each do |user|
      user.update_column(:account_id, "KB-#{1000 + user.id}")
    end
  end

  def down
    # Optional: revert to old format if needed
    User.find_each do |user|
      user.update_column(:account_id, "kemboi_#{1000 + user.id}")
    end
  end
end
