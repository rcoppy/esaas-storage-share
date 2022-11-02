# frozen_string_literal: true

FactoryBot.define do
  factory :renter do
    email { Faker::Internet.email }
    password { 'mypassword' }
  end
end
