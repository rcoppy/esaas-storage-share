class Conversation < ActiveRecord::Base
  belongs_to :renter        #, foreign_key: "sender_id"
  belongs_to :subletter        #, foreign_key:"recipient_id"
  has_many :messages, dependent: :destroy
  validates_uniqueness_of :renter_id, :scope => :subletter_id  #therefore there can be only one Conversation between a specific renter and subletter
  scope :between, -> (renter_id,subletter_id) do
    where("(conversations.renter_id = ? AND conversations.subletter_id =?)", renter_id,subletter_id)
  end
end