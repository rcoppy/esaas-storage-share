# frozen_string_literal: true

class Inquiry < ApplicationRecord
  belongs_to :listing
  belongs_to :renter

  has_one :conversation, dependent: :destroy

  has_one :subletter, through: :listing

  validates :start_date, :end_date, :renter_id, :listing_id, presence: true
  validate :start_date_cannot_be_in_the_past
  validate :end_date_cannot_be_before_start_date
end
