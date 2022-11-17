class Conversation < ActiveRecord::Base
  belongs_to :renter        # , foreign_key: "sender_id"
  belongs_to :subletter # , foreign_key:"recipient_id"
  belongs_to :inquiry
  has_many :messages, dependent: :destroy

  validates_uniqueness_of :renter_id, scope: :subletter_id
  # therefore there can be only one Conversation between a specific renter and subletter

  scope :between, lambda { |renter_id, subletter_id|
    where('(conversations.renter_id = ? AND conversations.subletter_id =?)', renter_id, subletter_id)
  }
end
