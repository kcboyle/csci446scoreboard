class HighscoresController < ApplicationController
  skip_before_filter :verify_authenticity_token
  respond_to :json
  
  def index
    @scores = Highscore.all.sort_by &:score
    respond_with(@scores)
  end

  # GET /highscores/1
  # GET /highscores/1.json
  def show
    @highscore = Highscore.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @highscore }
    end
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

  # PUT /highscores/1
  # PUT /highscores/1.json
end
