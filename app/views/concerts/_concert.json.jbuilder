json.extract! concert, :id, :title, :image, :comment_id, :created_at, :updated_at
json.url concert_url(concert, format: :json)
