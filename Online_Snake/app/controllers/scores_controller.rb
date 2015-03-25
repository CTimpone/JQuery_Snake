class ScoresController < ApplicationController
  def create
    @score = Score.new(score_params)
    if @score.save
      render json: Show.top_twelve
    else
      render json: {errors: @score.errors.full_messages}
    end
  end

  def index
    render json: Show.top_twelve
  end

  private
  def score_params
    params.require(:score).permit(:name, :speed, :score)
  end
end
