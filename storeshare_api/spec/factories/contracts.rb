# frozen_string_literal: true

FactoryBot.define do
  factory :contract do
    start_date { Date.today }
    end_date { Date.today + 1.month }
    price { 1000 }

    renter
    subletter
    listing
  end
end
