# frozen_string_literal: true

FactoryBot.define do
  factory :inquiry do
    start_date { Date.today }
    end_date { Date.today + 1.month }

    renter
    listing
  end
end
