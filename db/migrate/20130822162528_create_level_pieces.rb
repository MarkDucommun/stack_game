class CreateLevelPieces < ActiveRecord::Migration
  def change
    create_table :level_pieces do |t|
      t.belongs_to :level
      t.belongs_to :piece
      
      t.timestamps
    end
  end
end
