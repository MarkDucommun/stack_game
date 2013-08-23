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

  def self.create_from_level_data(level_data)
    level = Level.new(name: level_data[:name],
                         x_dimension: level_data[:size][:x],
                         y_dimension: level_data[:size][:y])
    level_data[:pieces].each do |key, piece|
      piece = Piece.find_or_initialize_by_x_and_y_and_piece(x: piece[:x],
                                                            y: piece[:y],
                                                            piece: piece[:piece])
      level.pieces << piece
    end
    level.save
    return level
  end
end
