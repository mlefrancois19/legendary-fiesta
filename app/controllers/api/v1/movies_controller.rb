class Api::V1::MoviesController < ApplicationController
  def index
    render json: Movie.all.order(created_at: :desc)
  end

  def create
    movie = Movie.create!(movie_params)
    if movie
      render json: movie
    else
      render json: movie.errors
    end
  end

  def update
    movie.update!(movie_params)
    render json: movie
  end

  def show
    render json: movie
  end

  def destroy
    movie.destroy
    head '200'
  end

  protected

  def movie_params
    params.require(:movie).permit(:title, :summary, :year, :genre, :imdb_link)
  end

  def movie
    @movie ||= Movie.find(params[:id])
  end
end
