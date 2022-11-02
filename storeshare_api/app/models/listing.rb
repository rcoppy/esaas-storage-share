# frozen_string_literal: true

class Listing < ApplicationRecord
  belongs_to :subletter, foreign_key: 'subletter_id', class_name: 'Subletter'
end
