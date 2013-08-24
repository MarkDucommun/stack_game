class Game < ActiveRecord::Base
  belongs_to :user
  belongs_to :level

  validates_presence_of :user, :level, :keystrokes
end
