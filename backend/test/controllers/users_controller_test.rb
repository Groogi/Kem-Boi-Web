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
end