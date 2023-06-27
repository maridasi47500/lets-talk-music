class CreateConcerts < ActiveRecord::Migration[7.0]
  def change
    create_table :concerts do |t|
      t.string :title
      t.string :image
      t.integer :comment_id

      t.timestamps
    end
  end
end