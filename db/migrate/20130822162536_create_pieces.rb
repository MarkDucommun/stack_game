class CreatePieces < ActiveRecord::Migration
  def change
    create_table :pieces do |t|
      t.integer :x
      t.integer :y
      t.string :piece

      t.timestamps
    end
  end
end
