class CreatePieces < ActiveRecord::Migration[7.0]
  def change
    create_table :pieces do |t|
      t.integer :composer_id
      t.string :title
      t.string :image

      t.timestamps
    end
  end
end
