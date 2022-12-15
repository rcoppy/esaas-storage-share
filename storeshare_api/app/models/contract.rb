# frozen_string_literal: true

class Contract < ApplicationRecord
  belongs_to :listing
  belongs_to :renter
  belongs_to :subletter

  has_many :payments, dependent: :destroy

  validates :start_date, :renter_id, :subletter_id, :listing_id, :price, presence: true
  validate :start_date_cannot_be_in_the_past
  validates :end_date, date: { after_or_equal_to: :start_date }, presence: true
  validate :renter_subletter_cannot_be_same, on: :create

  private

  def start_date_cannot_be_in_the_past
    return unless start_date.present? && start_date < Date.today

    errors.add(:start_date, 'cannot be in the past')
  end

  def renter_subletter_cannot_be_same
    # compare user_id of the renter and subletter
    return unless Renter.find(renter_id).user_id == Subletter.find(subletter_id).user_id

    errors.add(:renter_id, 'cannot belong to the same user as the subletter')
  end
end
