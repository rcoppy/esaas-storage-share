# frozen_string_literal: true

class Contract < ApplicationRecord
  belongs_to :listing
  belongs_to :renter
  belongs_to :subletter

  has_many :payments, dependent: :destroy
end
