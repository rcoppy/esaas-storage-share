class CreatePayments < ActiveRecord::Migration[7.0]
  def change
    create_table :payments do |t|
      t.belongs_to :contract, index: true, foreign_key: true
      t.belongs_to :subletter, index: true, foreign_key: true
      t.belongs_to :renter, index: true, foreign_key: true

      t.decimal :amount
      t.string :payment_type
      t.string :payment_status, default: 'pending'
      t.date :due_date

      t.timestamps
    end
  end
end
