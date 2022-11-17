# frozen_string_literal: true

class Contract < ApplicationRecord
  belongs_to :listing
  belongs_to :renter
  belongs_to :subletter

  has_many :payments, dependent: :destroy

  validates :start_date, :end_date, :renter_id, :subletter_id, :listing_id, presence: true

  validate :start_date_cannot_be_in_the_past
  validate :end_date_cannot_be_before_start_date
end
