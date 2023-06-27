class Comment < ApplicationRecord
    has_many :composers
    has_many :concerts
    has_many :pieces
      accepts_nested_attributes_for :composers, :concerts, :pieces, allow_destroy: true
end
