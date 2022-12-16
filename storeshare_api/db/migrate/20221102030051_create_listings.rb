class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.belongs_to :subletter, index: true, foreign_key: true

      t.string :title
      t.string :description
      t.decimal :price
      t.string :address
      t.string :city
      t.string :state
      t.string :zip_code
      t.integer :square_feet

      t.timestamps
    end
  end
end
