class ChangeLocationIdNullOnLinks < ActiveRecord::Migration[7.1]
  def change
    change_column_null :links, :location_id, true
  end
end
