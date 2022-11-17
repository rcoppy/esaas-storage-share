class CreateInquiries < ActiveRecord::Migration[7.0]
  def change
    create_table :inquiries do |t|
      t.belongs_to :renter, index: true, foreign_key: true
      t.belongs_to :listing, index: true, foreign_key: true

      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
