class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.belongs_to :subletter, null: false, foreign_key: true
      t.string :title
      t.string :description
      t.string :address
      t.string :city
      t.string :state
      t.string :zip
      t.string :square_feet

      t.timestamps
    end
  end
end
