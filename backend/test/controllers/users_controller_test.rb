require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "registers a new customer with valid details" do
    post "/register", params: {
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "password123",
      password_confirmation: "password123"
    }, as: :json

    assert_response :created

    response_body = JSON.parse(response.body)

    assert_equal "test@example.com", response_body["email"]
    assert_equal "Test", response_body["first_name"]
    assert_equal "User", response_body["last_name"]
    assert_equal 0, response_body["points_balance"]
    assert response_body["token"].present?

    user = User.find_by(email: "test@example.com")

    assert_not_nil user
    assert_equal "Test", user.first_name
    assert_equal "User", user.last_name
    assert_equal "customer", user.role
  end

  test "rejects registration with duplicate email" do
    existing_user = User.create!(
      first_name: "Existing",
      last_name: "User",
      email: "test@example.com",
      password: "password123",
      role: "customer"
    )

    post "/register", params: {
      first_name: "Test",
      last_name: "User",
      email: existing_user.email,
      password: "password123",
      password_confirmation: "password123"
    }, as: :json

    assert_response :unprocessable_entity

    response_body = JSON.parse(response.body)

    assert_includes response_body["errors"], "Email has already been taken"
  end

  test "rejects registration with missing required fields" do
    post "/register", params: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: ""
    }, as: :json

    assert_response :unprocessable_entity

    response_body = JSON.parse(response.body)

    assert_includes response_body["errors"], "First name can't be blank"
    assert_includes response_body["errors"], "Last name can't be blank"
    assert_includes response_body["errors"], "Email can't be blank"
    assert_includes response_body["errors"], "Password can't be blank"
  end

  test "rejects registration when passwords do not match" do
    post "/register", params: {
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "password123",
      password_confirmation: "differentpassword"
    }, as: :json

    assert_response :unprocessable_entity

    response_body = JSON.parse(response.body)

    assert_includes response_body["errors"], "Password confirmation doesn't match Password"
  end

  test "logs in with valid credentials" do
    User.create!(
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "password123",
      role: "customer"
    )

    post "/login", params: {
      email: "test@example.com",
      password: "password123"
    }, as: :json

    assert_response :success

    response_body = JSON.parse(response.body)

    assert_equal "test@example.com", response_body["email"]
    assert_equal "customer", response_body["role"]
    assert response_body["token"].present?
  end

  test "rejects login with invalid password" do
    User.create!(
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "password123",
      role: "customer"
    )

    post "/login", params: {
      email: "test@example.com",
      password: "wrongpassword"
    }, as: :json

    assert_response :unauthorized

    response_body = JSON.parse(response.body)

    assert_equal "invalid credentials", response_body["error"]
  end

  test "rejects login with non existent email" do
    post "/login", params: {
      email: "unknown@example.com",
      password: "password123"
    }, as: :json

    assert_response :unauthorized

    response_body = JSON.parse(response.body)

    assert_equal "invalid credentials", response_body["error"]
  end

  test "fetches authenticated user profile" do
    user = User.create!(
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "password123",
      role: "customer"
    )

    post "/login", params: {
      email: "test@example.com",
      password: "password123"
    }, as: :json

    login_response = JSON.parse(response.body)
    token = login_response["token"]

    get "/profile", headers: {
      "Authorization" => "Bearer #{token}"
    }

    assert_response :success

    response_body = JSON.parse(response.body)

    assert_equal user.email, response_body["email"]
    assert_equal user.first_name, response_body["first_name"]
    assert_equal user.last_name, response_body["last_name"]
    assert_equal user.role, response_body["role"]
  end

  test "updates authenticated user profile" do
    user = User.create!(
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "password123",
      role: "customer"
    )

    post "/login", params: {
      email: "test@example.com",
      password: "password123"
    }, as: :json

    login_response = JSON.parse(response.body)
    token = login_response["token"]

    put "/profile",
        params: {
          first_name: "Updated",
          last_name: "Customer",
          phone: "0412345678"
        },
        headers: {
          "Authorization" => "Bearer #{token}"
        },
        as: :json

    assert_response :success

    user.reload

    assert_equal "Updated", user.first_name
    assert_equal "Customer", user.last_name
    assert_equal "0412345678", user.phone
  end

  test "admin can retrieve users list" do
    admin = User.create!(
      first_name: "Admin",
      last_name: "User",
      email: "admin@example.com",
      password: "password123",
      role: "admin"
    )

    User.create!(
      first_name: "Customer",
      last_name: "User",
      email: "customer@example.com",
      password: "password123",
      role: "customer"
    )

    post "/login", params: {
      email: "admin@example.com",
      password: "password123"
    }, as: :json

    login_response = JSON.parse(response.body)
    token = login_response["token"]

    get "/users_list", headers: {
      "Authorization" => "Bearer #{token}"
    }

    assert_response :success

    response_body = JSON.parse(response.body)

    assert response_body.length >= 2
  end

  test "non admin cannot retrieve users list" do
    User.create!(
      first_name: "Test",
      last_name: "User",
      email: "customer@example.com",
      password: "password123",
      role: "customer"
    )

    post "/login", params: {
      email: "customer@example.com",
      password: "password123"
    }, as: :json

    login_response = JSON.parse(response.body)
    token = login_response["token"]

    get "/users_list", headers: {
      "Authorization" => "Bearer #{token}"
    }

    assert_response :unauthorized

    response_body = JSON.parse(response.body)

    assert_equal "Unauthorized", response_body["error"]
  end

  test "admin can add points to user" do
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

    post "/users/#{customer.id}/add_points",
        params: {
          points: 100,
          notes: "Test manual points"
        },
        headers: {
          "Authorization" => "Bearer #{token}"
        },
        as: :json

    assert_response :success

    customer.reload

    assert_equal 100, customer.points_balance
  end

  test "non admin cannot add points to user" do
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

    post "/users/#{target_user.id}/add_points",
        params: {
          points: 100,
          notes: "Unauthorised points test"
        },
        headers: {
          "Authorization" => "Bearer #{token}"
        },
        as: :json

    assert_response :unauthorized

    response_body = JSON.parse(response.body)

    assert_equal "Unauthorized", response_body["error"]
    assert_equal 0, target_user.reload.points_balance
  end
end