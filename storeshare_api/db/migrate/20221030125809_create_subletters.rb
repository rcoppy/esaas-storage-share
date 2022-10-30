class CreateSubletters < ActiveRecord::Migration[7.0]
  def change
    create_table :subletters do |t|
      t.timestamps
    end
  end
end
