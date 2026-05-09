require "test_helper"

class RewardsControllerTest < ActionDispatch::IntegrationTest
  test "customer can retrieve rewards list" do
    user = User.create!(
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "password123",
      role: "customer"
    )

    Reward.create!(
      name: "Free Tote Bag",
      description: "Demo reward",
      point_cost: 100,
      active: true,
      start_date: Date.today - 1,
      end_date: Date.today + 7
    )

    post "/login", params: {
      email: user.email,
      password: "password123"
    }, as: :json

    token = JSON.parse(response.body)["token"]

    get "/rewards", headers: {
      "Authorization" => "Bearer #{token}"
    }

    assert_response :success

    response_body = JSON.parse(response.body)

    assert response_body.length > 0
    reward_names = response_body.map { |reward| reward["name"] }

    assert_includes reward_names, "Free Tote Bag"
  end

  test "admin can create reward" do
    admin = User.create!(
      first_name: "Admin",
      last_name: "User",
      email: "admin@example.com",
      password: "password123",
      role: "admin"
    )

    post "/login", params: {
      email: admin.email,
      password: "password123"
    }, as: :json

    token = JSON.parse(response.body)["token"]

    post "/rewards",
        params: {
          name: "Free Ice Cream",
          description: "Redeem for a free ice cream in-store",
          point_cost: 100,
          active: true,
          start_date: Date.today,
          end_date: Date.today + 30
        },
        headers: {
          "Authorization" => "Bearer #{token}"
        },
        as: :json

    assert_response :created

    reward = Reward.find_by(name: "Free Ice Cream")

    assert_not_nil reward
    assert_equal 100, reward.point_cost
    assert_equal true, reward.active
  end

  test "non admin cannot create reward" do
    customer = User.create!(
      first_name: "Customer",
      last_name: "User",
      email: "customer@example.com",
      password: "password123",
      role: "customer"
    )

    post "/login", params: {
      email: customer.email,
      password: "password123"
    }, as: :json

    token = JSON.parse(response.body)["token"]

    post "/rewards",
        params: {
          name: "Free Ice Cream",
          description: "Redeem for a free ice cream in-store",
          point_cost: 100,
          active: true,
          start_date: Date.today,
          end_date: Date.today + 30
        },
        headers: {
          "Authorization" => "Bearer #{token}"
        },
        as: :json

    assert_response :unauthorized

    response_body = JSON.parse(response.body)

    assert_equal "Unauthorized", response_body["error"]
    assert_nil Reward.find_by(name: "Free Ice Cream")
  end

  test "customer can claim reward with sufficient points" do
    user = User.create!(
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "password123",
      role: "customer"
    )

    Transaction.create!(
      user: user,
      points: 500,
      transaction_type: "manual",
      notes: "Test points"
    )

    reward = Reward.create!(
      name: "Free Ice Cream",
      description: "Redeem for a free ice cream",
      point_cost: 100,
      active: true,
      start_date: Date.today,
      end_date: Date.today + 30
    )

    post "/login", params: {
      email: user.email,
      password: "password123"
    }, as: :json

    token = JSON.parse(response.body)["token"]

    post "/rewards/#{reward.id}/claim",
        headers: {
          "Authorization" => "Bearer #{token}"
        },
        as: :json

    assert_response :ok

    response_body = JSON.parse(response.body)

    assert_equal "Reward claimed successfully!", response_body["message"]
    assert_equal 400, response_body["point_balance"]

    redemption = Redemption.last

    assert_not_nil redemption
    assert_equal user.id, redemption.user_id
    assert_equal reward.id, redemption.reward_id

    user.reload

    assert_equal 400, user.points_balance
  end

  test "customer cannot claim reward with insufficient points" do
    user = User.create!(
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "password123",
      role: "customer"
    )

    Transaction.create!(
      user: user,
      points: 50,
      transaction_type: "manual",
      notes: "Insufficient points test"
    )

    reward = Reward.create!(
      name: "Free Ice Cream",
      description: "Redeem for a free ice cream",
      point_cost: 100,
      active: true,
      start_date: Date.today,
      end_date: Date.today + 30
    )

    post "/login", params: {
      email: user.email,
      password: "password123"
    }, as: :json

    token = JSON.parse(response.body)["token"]

    post "/rewards/#{reward.id}/claim",
        headers: {
          "Authorization" => "Bearer #{token}"
        },
        as: :json

    assert_response :unprocessable_entity

    response_body = JSON.parse(response.body)

    assert_equal "Insufficient points", response_body["error"]

    assert_equal 0, Redemption.where(user_id: user.id).count

    user.reload

    assert_equal 50, user.points_balance
  end

  test "customer can retrieve their redemption history" do
    user = User.create!(
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "password123",
      role: "customer"
    )

    reward = Reward.create!(
      name: "Free Ice Cream",
      description: "Redeem for a free ice cream",
      point_cost: 100,
      active: true,
      start_date: Date.today,
      end_date: Date.today + 30
    )

    Redemption.create!(
      user: user,
      reward: reward,
      voucher_code: "KB-TEST-001",
      status: "pending"
    )

    post "/login", params: {
      email: user.email,
      password: "password123"
    }, as: :json

    token = JSON.parse(response.body)["token"]

    get "/my_redemptions",
        headers: {
          "Authorization" => "Bearer #{token}"
        }

    assert_response :success

    response_body = JSON.parse(response.body)

    assert response_body.length > 0

    redemption_codes = response_body.map { |redemption| redemption["voucher_code"] }

    assert_includes redemption_codes, "KB-TEST-001"
  end

  test "admin can mark redemption as used" do
    admin = User.create!(
      first_name: "Admin",
      last_name: "User",
      email: "admin@example.com",
      password: "password123",
      role: "admin"
    )

    customer = User.create!(
      first_name: "Customer",
      last_name: "User",
      email: "customer@example.com",
      password: "password123",
      role: "customer"
    )

    reward = Reward.create!(
      name: "Free Ice Cream",
      description: "Redeem for a free ice cream",
      point_cost: 100,
      active: true,
      start_date: Date.today,
      end_date: Date.today + 30
    )

    redemption = Redemption.create!(
      user: customer,
      reward: reward,
      voucher_code: "KB-TEST-002",
      status: "pending"
    )

    post "/login", params: {
      email: admin.email,
      password: "password123"
    }, as: :json

    token = JSON.parse(response.body)["token"]

    put "/redemptions/#{redemption.id}",
        params: { status: "used" },
        headers: {
          "Authorization" => "Bearer #{token}"
        },
        as: :json

    assert_response :success

    redemption.reload

    assert_equal "used", redemption.status
  end
end