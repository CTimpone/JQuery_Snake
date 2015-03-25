class ScoresController < ApplicationController
  def create
    @score = Score.new(score_params)
    if @score.name.length > 15
      @score.name = @score.name[0..14]
    end
    if @score.save
      render json: Score.top_eleven
    else
      render json: {errors: @score.errors.full_messages}
    end
  end

  def index
    render json: Score.top_eleven
  end

  private
  def score_params
    params.require(:score).permit(:name, :speed, :score)
  end
end
