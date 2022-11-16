# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# frozen_string_literal: true

require 'faker'

# Create Users
User.destroy_all

# 10.times do
#   User.create!(
#     email: Faker::Internet.email,
#     password: Faker::Internet.password,
#     name: Faker::Name.name,
#     phone_number: Faker::PhoneNumber.phone_number,
#     address: Faker::Address.full_address
#   )
# end

password = 'password'

User.create!(
  [
    {
      name: 'Unal Yigit Ozulku',
      email: Faker::Internet.email,
      password:,
      password_confirmation: password,
      phone_number: Faker::PhoneNumber.phone_number,
      address: Faker::Address.full_address
    },
    {
      name: 'Kutay Karakas',
      email: Faker::Internet.email,
      password:,
      password_confirmation: password,
      phone_number: Faker::PhoneNumber.phone_number,
      address: Faker::Address.full_address
    },
    {
      name: 'Alex Rupp-Coppi',
      email: Faker::Internet.email,
      password:,
      password_confirmation: password,
      phone_number: Faker::PhoneNumber.phone_number,
      address: Faker::Address.full_address

    }
  ]
)

# Create Subletters
Subletter.destroy_all

# make Alex the subletter
alex = User.find_by(name: 'Alex Rupp-Coppi')
alex_subletter = Subletter.create!(
  user_id: alex.id
)

# Create Renters
Renter.destroy_all

# make Yigit and Kutay the renters
unal = User.find_by(name: 'Unal Yigit Ozulku')
kutay = User.find_by(name: 'Kutay Karakas')

Renter.create!(
  [
    {
      user_id: unal.id
    },
    {
      user_id: kutay.id
    }
  ]
)

# Create Listings
Listing.destroy_all

# make 5 listings
5.times do
  Listing.create!(
    subletter_id: alex_subletter.id,
    address: Faker::Address.full_address,
    price: Faker::Number.decimal(l_digits: 2),
    description: Faker::Lorem.paragraph(sentence_count: 2),
    title: Faker::Lorem.sentence(word_count: 3),
    # image: Faker::LoremFlickr.image(size: '300x300', search_terms: ['apartment']),
    square_feet: Faker::Number.number(digits: 3)
  )
end
