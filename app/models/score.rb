class Score < ActiveRecord::Base
  validates :name, :score, :speed, presence: true

  def self.top_eleven
    Score.where("score > 0").order(score: :desc).limit(11)
  end
end
