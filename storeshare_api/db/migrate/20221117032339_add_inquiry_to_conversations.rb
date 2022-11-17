class AddInquiryToConversations < ActiveRecord::Migration[7.0]
  def change
    add_reference :conversations, :inquiry, null: false, foreign_key: true, index: true
  end
end
