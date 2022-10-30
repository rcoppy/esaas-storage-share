# frozen_string_literal: true

class Subletter < User
  has_many :listings, dependent: :destroy
end
