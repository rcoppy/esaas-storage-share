# frozen_string_literal: true

class Inquiry < ApplicationRecord
  belongs_to :listing
  belongs_to :renter

  has_one :conversation, dependent: :destroy

  has_one :subletter, through: :listing

  validates :start_date, :end_date, :renter_id, :listing_id, presence: true
end
