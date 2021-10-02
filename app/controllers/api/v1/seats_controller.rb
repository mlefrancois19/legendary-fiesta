require 'seats'

class Api::V1::SeatsController < ApplicationController
  def create
    seat_map = YAML.load(seat_params[:seat_map])
    best_seat_params = {
      layout: seat_map['venue']['layout'], 
      available_seats: seat_map['seats'], 
      nb_seats: seat_params['nb'].to_i
    }
    result = Seats.new(best_seat_params).find_best

    render json: { result: result }
  end

  protected 

  def seat_params
    params.require(:seat).permit(:nb, :seat_map)
  end
end



