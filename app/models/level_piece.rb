class LevelPiece < ActiveRecord::Base
  belongs_to :level
  belongs_to :piece
end
