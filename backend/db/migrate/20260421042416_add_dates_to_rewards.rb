class AddDatesToRewards < ActiveRecord::Migration[8.1]
  def change
    add_column :rewards, :start_date, :date
    add_column :rewards, :end_date, :date
  end
end
