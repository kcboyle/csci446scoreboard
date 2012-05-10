class HighscoresController < ApplicationController
  skip_before_filter :verify_authenticity_token
  respond_to :json
  
  def index
    @scores = Highscore.all.sort_by(&:score).reverse
    respond_with(@scores)
  end
  
  # POST /highscores
  # POST /highscores.json
  def create
    @score = Highscore.new(name: params[:name], score: params[:score])

    respond_to do |format|
      if @score.save
        format.json { render json: @score, status: :created, location: @score }
      end
    end
  end
end
