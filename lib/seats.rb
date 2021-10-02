class Seats
    attr_reader :layout, :available_seats, :best_row, :best_column, :nb_seats

    def initialize(params = {})
      if params[:layout] && params[:available_seats]
        @layout = params[:layout]
        @available_seats = params[:available_seats]
      else
        seats_info = JSON.parse(File.read(params[:file_path] || "#{Rails.root}/venue.json"))
        @layout = seats_info["venue"]["layout"]
        @available_seats = seats_info["seats"]
      end

      @available_seats = @available_seats.reject{|k, v| v["status"] != "AVAILABLE" }
      @best_row = 1
      @best_column = (layout['columns'] / 2.0).ceil
      @nb_seats = params[:nb_seats] || 1
    end

    def find_best
      # sort by row first, get column closest to middle  
      sorted_seats = available_seats.values.sort_by { |available_seat| [available_seat['row'] , (best_column - available_seat['column']).abs] }
      # take the number of seats needed
      sorted_seats.take(nb_seats).sort_by{ |seat| seat["id"] }
    end
end