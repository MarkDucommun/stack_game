class Level < ActiveRecord::Base
  belongs_to :creator, class_name: 'User'
  has_many :games
  has_many :users, through: :games
  has_many :level_pieces
  has_many :pieces, through: :level_pieces

  def self.get_level_data(level_id)
    level = self.find(level_id)
    level_data = {}
    level_data[:size] = {x: level.x_dimension, y: level.y_dimension}
    level_data[:pieces] = []
    level.pieces.each do |piece|
      level_data[:pieces] << {x: piece.x, y: piece.y, piece: piece.piece}
    end
    level_data.to_json
  end
end
