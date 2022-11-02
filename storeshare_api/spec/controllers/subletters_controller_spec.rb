# frozen_string_literal: true

require 'rails_helper'
require_relative '../support/devise'

RSpec.describe SublettersController, type: :controller do
  let!(:subletter) { FactoryBot.create(:subletter) }

  describe 'get all listings' do
    login_user

    it 'returns all listings' do
      # listing = Listing.new(
      #   address: '',
      #   price: '',
      #   description: ''
      # )

      # listing.user = subletter
      # # binding.pry
      # listing.save!

      listing = FactoryBot.create(:listing, user: subletter)

      get :all_listings, params: { id: subletter.id }
      expect(response).to have_http_status(:success)
      expect(assigns(:listings)).to eq([listing])
    end
  end

  describe 'get my listings' do
    login_user

    it 'returns the listings of the user' do
      # listing = Listing.new(
      #   address: '123 Main St',
      #   price: 100.0,
      #   description: 'test'
      # )

      # listing.user = subletter
      # listing.save!

      listing = FactoryBot.create(:listing, user: subletter)

      get :my_listings, params: { id: subletter.id }
      expect(response).to have_http_status(:success)
      expect(assigns(:listings)).to eq([listing])
    end
  end
end
