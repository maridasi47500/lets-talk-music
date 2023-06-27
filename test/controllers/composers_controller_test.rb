require "test_helper"

class ComposersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @composer = composers(:one)
  end

  test "should get index" do
    get composers_url
    assert_response :success
  end

  test "should get new" do
    get new_composer_url
    assert_response :success
  end

  test "should create composer" do
    assert_difference("Composer.count") do
      post composers_url, params: { composer: { comment_id: @composer.comment_id, image: @composer.image, name: @composer.name } }
    end

    assert_redirected_to composer_url(Composer.last)
  end

  test "should show composer" do
    get composer_url(@composer)
    assert_response :success
  end

  test "should get edit" do
    get edit_composer_url(@composer)
    assert_response :success
  end

  test "should update composer" do
    patch composer_url(@composer), params: { composer: { comment_id: @composer.comment_id, image: @composer.image, name: @composer.name } }
    assert_redirected_to composer_url(@composer)
  end

  test "should destroy composer" do
    assert_difference("Composer.count", -1) do
      delete composer_url(@composer)
    end

    assert_redirected_to composers_url
  end
end
