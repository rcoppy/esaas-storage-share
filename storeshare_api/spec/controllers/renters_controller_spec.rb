# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RentersController, type: :request do
  renter = FactoryBot.create(:user)

  describe 'get all listings' do
    it 'returns all listings' do
      listing = Listing.new(
        address: '',
        price: '',
        description: ''
      )

      listing.user = renter
      listing.save!

      get "/renters/#{renter.id}/listings"
      expect(response).to have_http_status(:success)
      expect(assigns(:listings)).to eq([listing])
    end
  end
end
