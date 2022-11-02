# frozen_string_literal: true

require 'rails_helper'
require_relative '../support/devise'

RSpec.describe RentersController, type: :controller do
  renter = FactoryBot.create(:renter)
  subletter = FactoryBot.create(:subletter)

  describe 'get all listings' do
    login_user

    it 'returns all listings' do
      # listing = Listing.new(
      #   address: '',
      #   price: '',
      #   description: ''
      # )

      # listing.user = subletter
      # listing.save!

      listing = FactoryBot.create(:listing, user: subletter)

      get :all_listings, params: { id: renter.id }
      expect(response).to have_http_status(:success)
      expect(assigns(:listings)).to eq([listing])
    end
  end
end
