require "application_system_test_case"

class ComposersTest < ApplicationSystemTestCase
  setup do
    @composer = composers(:one)
  end

  test "visiting the index" do
    visit composers_url
    assert_selector "h1", text: "Composers"
  end

  test "should create composer" do
    visit composers_url
    click_on "New composer"

    fill_in "Comment", with: @composer.comment_id
    fill_in "Image", with: @composer.image
    fill_in "Name", with: @composer.name
    click_on "Create Composer"

    assert_text "Composer was successfully created"
    click_on "Back"
  end

  test "should update Composer" do
    visit composer_url(@composer)
    click_on "Edit this composer", match: :first

    fill_in "Comment", with: @composer.comment_id
    fill_in "Image", with: @composer.image
    fill_in "Name", with: @composer.name
    click_on "Update Composer"

    assert_text "Composer was successfully updated"
    click_on "Back"
  end

  test "should destroy Composer" do
    visit composer_url(@composer)
    click_on "Destroy this composer", match: :first

    assert_text "Composer was successfully destroyed"
  end
end
