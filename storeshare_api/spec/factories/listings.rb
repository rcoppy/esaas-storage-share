FactoryBot.define do
  factory :listing do
    address { Faker::Address.street_address }
    price { Faker::Number.decimal(l_digits: 2) }
    description { Faker::Lorem.paragraph }
    user
  end
end
