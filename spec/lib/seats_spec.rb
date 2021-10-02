require 'rails_helper'
require 'seats'

RSpec.describe Seats do
    describe "#find_best" do
      context "with params layout and seats params" do 
        let(:nb_rows){ 1 }
        let(:nb_cols){ 1 }
        let(:unavailable_list){ [] } 
        let(:venue){ venue_generator(nb_rows, nb_cols, unavailable_list) }

        subject { Seats.new({ layout: venue['venue']['layout'], available_seats: venue['seats'], nb_seats: nb_seat }) }

        context "10 rows 12 colums" do
            let(:nb_rows){ 10 }
            let(:nb_cols){ 12 }
            let(:nb_seat) { 1 }

            context "1 seat" do
                it "should return A6" do
                    res = subject.find_best
                    expect(res.length).to eq(nb_seat)
                    expect(res.first["id"]).to eq("a6")
                end
            end

            context "3 seats" do
                let(:nb_seat) { 3 }

                it "should return A5, A6, A7" do
                    res = subject.find_best
                    expect(res.length).to eq(nb_seat)
                    expect(res.map{|r| r["id"]}).to eq(%w{ a5 a6 a7 })
                end
            end
        end

        context "4 rows 5 colums" do
            context "first row occupied" do
            let(:nb_rows){ 4 }
            let(:nb_cols){ 5 }
            let(:nb_seat) { 2 }
            let(:unavailable_list){ %w{ a1 a2 a3 a4 a5 } } 

            it "should return B2, B3" do
                res = subject.find_best
                expect(res.length).to eq(nb_seat)
                expect(res.map{|r| r["id"]}).to eq(%w{ b2 b3 })
            end
            end
        end
      end

      context "with file as params" do
        let(:nb_seat) { 1 }
        subject { Seats.new({nb_seats: nb_seat }) }

        it "should return a1" do
            res = subject.find_best
            expect(res.length).to eq(nb_seat)
            expect(res.map{|r| r["id"]}).to eq(%w{ a1 })
        end
      end
    end

    def venue_generator(rows, columns, unavailable_list = [])
        alpha = %w{a b c d e f g h i j k l m n o p q r s t u v w x y z}
        
        seats = (1..rows).to_a.map do |row|
          (1..columns).to_a.map do |col|
            { 
                "#{alpha[row - 1]}#{col}" => { 
                    id: "#{alpha[row - 1]}#{col}", 
                    row: alpha[row - 1], 
                    column: col, 
                    status: unavailable_list.include?("#{alpha[row - 1]}#{col}") ? "UNAVAILABLE" : "AVAILABLE" 
                } 
            }
          end.reduce(&:merge)
        end.reduce(&:merge)
  
        YAML.load({ venue: { layout: { rows: rows, columns: columns } }, seats: seats }.to_json)
    end
end
