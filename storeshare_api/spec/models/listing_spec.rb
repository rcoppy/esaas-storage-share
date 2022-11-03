# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Listing, type: :model do
  describe 'validations' do
    it 'is invalid without a subletter_id' do
      listing = Listing.new(subletter_id: nil)
      expect(listing).to_not be_valid
    end
  end

  describe 'associations' do
    it 'belongs to a subletter' do
      assc = described_class.reflect_on_association(:subletter)
      expect(assc.macro).to eq :belongs_to
    end
  end

  describe 'attributes' do
    it 'has an address' do
      listing = Listing.new(address: '123 Main St')
      expect(listing.address).to eq('123 Main St')
    end

    it 'has a price' do
      listing = Listing.new(price: 1000)
      expect(listing.price).to eq(1000)
    end

    it 'has a description' do
      listing = Listing.new(description: 'A nice place')
      expect(listing.description).to eq('A nice place')
    end

    it 'has a city' do
      listing = Listing.new(city: 'Chicago')
      expect(listing.city).to eq('Chicago')
    end

    it 'has a state' do
      listing = Listing.new(state: 'IL')
      expect(listing.state).to eq('IL')
    end

    it 'has a zip code' do
      listing = Listing.new(zip_code: '60606')
      expect(listing.zip_code).to eq('60606')
    end
  end

  # describe 'methods' do
  #   it 'returns a list of all listings' do
  #     subletter = Subletter.create(email: '', password: 'password', password_confirmation: 'password')
  #     listing = Listing.create(address: '123 Main St', price: 1000, description: 'A nice place',
  #                              subletter_id: subletter.id, city: 'Chicago', state: 'IL', zip_code: 60_606)
  #     expect(Listing.all_listings).to eq([listing])
  #   end

  #   it 'returns a list of all listings for a subletter' do
  #     subletter = Subletter.create(email: '', password: 'password', password_confirmation: 'password')
  #     listing = Listing.create(address: '123 Main St', price: 1000, description: 'A nice place',
  #                              subletter_id: subletter.id, city: 'Chicago', state: 'IL', zip_code: 60_606)
  #     expect(Listing.my_listings(subletter.id)).to eq([listing])
  #   end
  # end
end
