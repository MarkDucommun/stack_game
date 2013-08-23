class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.belongs_to :user
      t.belongs_to :level
      t.string :keystrokes
      t.integer :rating

      t.timestamps
    end
  end
end
