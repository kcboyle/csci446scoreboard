class Highscore < ActiveRecord::Base
  attr_accessible :name, :score
  validates :name, :presence => true
end
