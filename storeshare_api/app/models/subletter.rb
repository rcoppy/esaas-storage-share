# frozen_string_literal: true

class Subletter < ApplicationRecord
  belongs_to :user

  has_many :listings, dependent: :destroy
end
