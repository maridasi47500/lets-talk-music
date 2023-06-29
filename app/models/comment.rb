class Comment < ApplicationRecord
    has_and_belongs_to_many :composers,:join_table=>:composerscomments
    has_and_belongs_to_many :concerts, :join_table=>:concertscomments
    has_and_belongs_to_many :pieces, :join_table=>:piecescomments
      accepts_nested_attributes_for :composers, :concerts, :pieces, allow_destroy: true
end
