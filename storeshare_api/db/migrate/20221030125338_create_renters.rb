class CreateRenters < ActiveRecord::Migration[7.0]
  def change
    create_table :renters do |t|
      t.timestamps
    end
  end
end
