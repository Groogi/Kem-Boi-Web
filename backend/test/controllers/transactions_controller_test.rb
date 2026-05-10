require "test_helper"

class TransactionsControllerTest < ActionDispatch::IntegrationTest
  test "customer can retrieve transaction history" do
    user = User.create!(
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "password123",
      role: "customer"
    )

    Transaction.create!(
      user: user,
      points: 200,
      transaction_type: "manual",
      notes: "Test transaction"
    )

    post "/login", params: {
      email: user.email,
      password: "password123"
    }, as: :json

    token = JSON.parse(response.body)["token"]

    get "/transactions",
        headers: {
          "Authorization" => "Bearer #{token}"
        }

    assert_response :success

    response_body = JSON.parse(response.body)

    assert response_body.length > 0

    notes = response_body.map { |transaction| transaction["notes"] }

    assert_includes notes, "Test transaction"
  end

  test "admin can quick add points by email" do
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

    post "/login", params: {
      email: admin.email,
      password: "password123"
    }, as: :json

    token = JSON.parse(response.body)["token"]

    post "/transactions/quick_add",
        params: {
          email: customer.email,
          points: 150,
          notes: "Quick add test"
        },
        headers: {
          "Authorization" => "Bearer #{token}"
        },
        as: :json

    assert_response :success

    customer.reload

    assert_equal 150, customer.points_balance
  end

  test "non admin cannot quick add points" do
    customer = User.create!(
      first_name: "Customer",
      last_name: "User",
      email: "customer@example.com",
      password: "password123",
      role: "customer"
    )

    target_user = User.create!(
      first_name: "Target",
      last_name: "User",
      email: "target@example.com",
      password: "password123",
      role: "customer"
    )

    post "/login", params: {
      email: customer.email,
      password: "password123"
    }, as: :json

    token = JSON.parse(response.body)["token"]

    post "/transactions/quick_add",
        params: {
          email: target_user.email,
          points: 100,
          notes: "Unauthorised quick add"
        },
        headers: {
          "Authorization" => "Bearer #{token}"
        },
        as: :json

    assert_response :unauthorized

    response_body = JSON.parse(response.body)

    assert_equal "Unauthorized", response_body["error"]

    target_user.reload

    assert_equal 0, target_user.points_balance
  end
end