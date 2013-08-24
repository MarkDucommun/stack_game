class Piece < ActiveRecord::Base
  has_many :levels

  validates_presence_of :x, :y, :piece
end
