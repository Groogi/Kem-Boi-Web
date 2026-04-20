# Clear existing data to ensure a fresh start
puts "🧹 Cleaning database..."
Transaction.destroy_all
Location.destroy_all
Giveaway.destroy_all
Link.destroy_all
Reward.destroy_all
Redemption.destroy_all
User.destroy_all

# 1. Create Admin
puts "👤 Creating Admin..."
User.create!(
  first_name: "Kem Boi",
  last_name: "Admin",
  email: "admin@kemboi.com",
  password: "password123",
  role: "admin"
)

# 2. Create Tester Customer
puts "🥑 Creating Tester User..."
tester = User.create!(
  first_name: "John",
  last_name: "Doe",
  email: "tester@kemboi.com",
  password: "password123",
  role: "customer"
)

# 3. Create Sample Locations
puts "📍 Creating Store Locations..."
Location.create!([
  {
    name: "The Flagship Stall",
    address_line_1: "123 Avocado Lane",
    suburb: "Springfield",
    state: "QLD",
    postcode: "4000",
    active: true,
    map_url: "https://maps.google.com"
  },
  {
    name: "Kem Boi Logan",
    address_line_1: "456 Fruit Street",
    suburb: "Logan",
    state: "QLD",
    postcode: "4114",
    active: true
  },
  {
    name: "South Bank Pop-up",
    address_line_1: "South Bank Parklands",
    suburb: "Brisbane",
    state: "QLD",
    postcode: "4101",
    active: false # Coming soon
  }
])

# 4. Create Giveaways
puts "🎁 Creating Giveaways..."
Giveaway.create!([
  {
    title: "Free Tote Bag for 100th Member",
    description: "Our signature editorial tote bag is up for grabs!",
    participation_conditions: "Must be a registered member with at least 1 transaction.",
    start_date: Date.today - 7,
    end_date: Date.today + 14,
    active: true
  },
  {
    title: "Win an Avocado Plushie",
    description: "The cutest companion for your Kem Boi journey.",
    participation_conditions: "Follow us on Instagram and Enter here.",
    start_date: Date.today + 5,
    end_date: Date.today + 20,
    active: false # Upcoming
  }
])

# 5. Create Rewards
puts "🏆 Creating Rewards..."
Reward.create!([
  {
    name: "Refer A Friend",
    description: "Sweet Treats are better with a friend.",
    point_cost: 0, # Or whatever cost
    active: true
  },
  {
    name: "Loyalty Level Up",
    description: "Loyalty hits different when its sweet.",
    point_cost: 500,
    active: true
  },
  {
    name: "Birthday Surprise",
    description: "A special treat for your special day.",
    point_cost: 0,
    active: false
  }
])

# 6. Create Transactions for Tester (to show Points & Punch Card)
puts "💰 Seeding Transaction History (800 points total)..."
# Each 'earn' of 200 points corresponds to 1 punch in our UI logic
4.times do |i|
  Transaction.create!(
    user: tester,
    points: 200,
    transaction_type: "manual",
    notes: "Purchase at #{Location.first.name} - Receipt ##{1000 + i}"
  )
end

puts "✅ SUCCESS: Database is now fully seeded with Demo Data!"
puts "Admin: admin@kemboi.com (password123)"
puts "Tester: tester@kemboi.com (password123) - Balance: 800 pts (4 Punches)"
