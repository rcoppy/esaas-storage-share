# frozen_string_literal: true

class Listing < ApplicationRecord
  belongs_to :subletter
  has_one_attached :image, dependent: :destroy
end
