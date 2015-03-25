class Score < ActiveRecord::Base
  validates :name, :score, :speed, presence: true

  def self.top_twelve
    Score.where("score > 0").limit(12)
  end
end
