require "test_helper"

class GiveawayEntriesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get giveaway_entries_create_url
    assert_response :success
  end

  test "should get index" do
    get giveaway_entries_index_url
    assert_response :success
  end
end
