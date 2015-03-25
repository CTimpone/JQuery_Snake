class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.integer :score, null: false
      t.integer :speed, null: false
      t.string :name, null: false

      t.timestamps null: false
    end
  end
end
