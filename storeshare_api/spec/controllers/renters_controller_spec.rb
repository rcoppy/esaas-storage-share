# frozen_string_literal: true

require 'rails_helper'
require_relative '../support/devise'

RSpec.describe RentersController, type: :controller do
  user1 = FactoryBot.create(:user)
  user2 = FactoryBot.create(:user)

  renter = FactoryBot.create(:renter, user: user1)
  subletter = FactoryBot.create(:subletter, user: user2)

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

      listing = FactoryBot.create(:listing, subletter:)

      get :all_listings, params: { id: renter.id }
      expect(response).to have_http_status(:success)
      expect(assigns(:listings)).to eq([listing])
    end
  end
end
