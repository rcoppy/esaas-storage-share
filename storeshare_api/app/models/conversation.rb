class Conversation < ActiveRecord::Base
  belongs_to :sender, :foreign_key => :sender_id, class_name: 'renter'
  belongs_to :recipient, :foreign_key => :recipient_id, class_name: 'subletter'
  has_many :messages, dependent: :destroy
  validates_uniqueness_of :sender_id, :scope => :recipient_id  #therefore there can be only one Conversation between a specific renter and subletter
  scope :between, -> (sender_id,recipient_id) do
    where("(conversations.sender_id = ? AND conversations.recipient_id =?) OR (conversations.sender_id = ? AND conversations.recipient_id =?)", sender_id,recipient_id, recipient_id, sender_id)
  end
end