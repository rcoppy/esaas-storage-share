FactoryBot.define do
  factory :listing do
    address { Faker::Address.street_address }
    price { Faker::Number.decimal(l_digits: 2) }
    description { Faker::Lorem.paragraph }
    title { Faker::Lorem.sentence }
    city { Faker::Address.city }
    state { Faker::Address.state }
    zip_code { Faker::Address.zip_code }
    square_feet { Faker::Number.number(digits: 3) }

    subletter
  end
end
