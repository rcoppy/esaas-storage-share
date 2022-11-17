# frozen_string_literal: true

class Contract < ApplicationRecord
  belongs_to :listing
  belongs_to :renter
  belongs_to :subletter

  has_many :payments, dependent: :destroy

  validates :start_date, :renter_id, :subletter_id, :listing_id, :price, presence: true
  validate :start_date_cannot_be_in_the_past
  validates :end_date, date: { after_or_equal_to: :start_date }, presence: true

  private

  def start_date_cannot_be_in_the_past
    return unless start_date.present? && start_date < Date.today

    errors.add(:start_date, 'cannot be in the past')
  end
end
