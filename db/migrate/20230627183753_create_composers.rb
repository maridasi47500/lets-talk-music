class CreateComposers < ActiveRecord::Migration[7.0]
  def change
    create_table :composerscomments do |t|
      t.integer :composer_id
      t.integer :comment_id
    end
    create_table :concertscomments do |t|
      t.integer :concert_id
      t.integer :comment_id
    end
    create_table :piecescomments do |t|
      t.integer :piece_id
      t.integer :comment_id
    end
    create_table :composers do |t|
      t.string :name
      t.string :image
      t.timestamps
    end
  end
end
