# frozen_string_literal: true

class Payment < ApplicationRecord
  belongs_to :contract
  belongs_to :subletter
  belongs_to :renter

  has_one :listing, through: :contract

  validates :amount, :due_date, :contract_id, :subletter_id, :renter_id, presence: true
  validates :payment_type, inclusion: { in: %w[pending posted returned] }, allow_nil: true
end
