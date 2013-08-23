class CreateLevels < ActiveRecord::Migration
  def change
    create_table :levels do |t|
      t.belongs_to :user
      t.string :name
      t.integer :x_dimension
      t.integer :y_dimension
      
      t.timestamps
    end
  end
end
