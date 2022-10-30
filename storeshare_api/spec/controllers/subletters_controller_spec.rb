# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SublettersController, type: :request do
  subletter = FactoryBot.create(:user)

  describe 'get all listings' do
    it 'returns all listings' do
      listing = Listing.new(
        address: '',
        price: '',
        description: ''
      )

      listing.user = subletter
      listing.save!

      get "/subletters/#{subletter.id}/listings"
      expect(response).to have_http_status(:success)
      expect(assigns(:listings)).to eq([listing])
    end
  end
end
