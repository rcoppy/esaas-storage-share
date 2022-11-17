class CreateContracts < ActiveRecord::Migration[7.0]
  def change
    create_table :contracts do |t|
      t.belongs_to :renter, index: true, foreign_key: true
      t.belongs_to :subletter, index: true, foreign_key: true
      t.belongs_to :listing, index: true, foreign_key: true

      t.date :start_date
      t.date :end_date

      t.decimal :price

      t.timestamps
    end
  end
end
