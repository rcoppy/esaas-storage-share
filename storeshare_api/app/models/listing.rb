# frozen_string_literal: true

class Listing < ApplicationRecord
  include Filterable

  belongs_to :subletter
  has_one_attached :image, dependent: :destroy

  scope :filter_by_city, ->(city) { where city: city }
  scope :filter_by_state, ->(state) { where state: }
  scope :filter_by_zip_code, ->(zip_code) { where zip_code: zip_code }

  # filter by price where the listing's price <= target_price
  scope :filter_by_price, ->(price) { where('price <= ?', price) }

  # filter by square feet where square_feet >= target_square_feet
  scope :filter_by_square_feet, ->(square_feet) { where('square_feet >= ?', square_feet) }
end
