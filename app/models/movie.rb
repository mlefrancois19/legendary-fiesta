class Movie < ApplicationRecord
  validates :title, presence: true
  validates :summary, presence: true
  validates :year, presence: true
  validates :genre, presence: true
end
