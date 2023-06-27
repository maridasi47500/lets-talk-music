class CreateComposers < ActiveRecord::Migration[7.0]
  def change
    create_table :composers do |t|
      t.string :name
      t.string :image
      t.integer :comment_id
      t.timestamps
    end
  end
end
