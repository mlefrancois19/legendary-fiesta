class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.text :summary
      t.integer :year
      t.string :genre
      t.string :imdb_link

      t.timestamps
    end
  end
end
