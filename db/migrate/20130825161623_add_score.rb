class AddScore < ActiveRecord::Migration
  def change
    add_column :games, :score, :integer, index: true
  end
end
