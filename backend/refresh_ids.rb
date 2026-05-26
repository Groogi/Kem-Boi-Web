User.all.each do |u|
  u.update_column(:account_id, "KB-#{1000 + u.id}")
end
puts "Refreshed #{User.count} IDs to KB- format."
