require "test_helper"

class NewControllerTest < ActionDispatch::IntegrationTest
  test "should get comment" do
    get new_comment_url
    assert_response :success
  end
end
