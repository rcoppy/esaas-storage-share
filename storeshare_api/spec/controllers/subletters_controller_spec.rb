# frozen_string_literal: true

require 'rails_helper'
require_relative '../support/devise'

RSpec.describe SublettersController, type: :controller do
  subletter = FactoryBot.create(:user)

  # describe 'get all listings' do
  #   login_user

  #   it 'returns all listings' do
  #     listing = Listing.new(
  #       address: '',
  #       price: '',
  #       description: ''
  #     )

  #     listing.user = subletter
  #     listing.save!

  #     get :all_listings, params: { id: subletter.id }
  #     expect(response).to have_http_status(:success)
  #     expect(assigns(:listings)).to eq([listing])
  #   end
  # end

  describe 'get my listings' do
    login_user

    it 'returns all listings belonging to a user' do
      listing = Listing.new(
        address: '',
        price: '',
        description: ''
      )

      listing.user = subletter
      listing.save!

      get :my_listings, params: { id: subletter.id }
      expect(response).to have_http_status(:success)
      expect(assigns(:listings)).to eq([listing])
    end
  end
end
