require "test_helper"

class LocationsControllerTest < ActionDispatch::IntegrationTest
  test "customer can retrieve locations list" do
    user = User.create!(
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "password123",
      role: "customer"
    )

    Location.create!(
      name: "Kem Boi Logan",
      address_line_1: "123 Test Street",
      suburb: "Logan",
      state: "QLD",
      postcode: "4114",
      active: true
    )

    post "/login", params: {
      email: user.email,
      password: "password123"
    }, as: :json

    token = JSON.parse(response.body)["token"]

    get "/locations",
        headers: {
          "Authorization" => "Bearer #{token}"
        }

    assert_response :success

    response_body = JSON.parse(response.body)

    assert response_body.length > 0

    location_names = response_body.map { |location| location["name"] }

    assert_includes location_names, "Kem Boi Logan"
  end

  test "admin can create location" do
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

    post "/locations",
        params: {
          name: "Kem Boi Test Store",
          address_line_1: "123 Test Street",
          suburb: "Gold Coast",
          state: "QLD",
          postcode: "4217",
          active: true,
          map_url: "https://maps.google.com"
        },
        headers: {
          "Authorization" => "Bearer #{token}"
        },
        as: :json

    assert_response :created

    location = Location.find_by(name: "Kem Boi Test Store")

    assert_not_nil location
    assert_equal "Gold Coast", location.suburb
    assert_equal true, location.active
  end
end