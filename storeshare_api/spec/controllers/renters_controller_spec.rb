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
      listing = FactoryBot.create(:listing, subletter:)

      get :all_listings, params: { id: renter.id }
      expect(response).to have_http_status(:success)
      expect(assigns(:listings)).to eq([listing])
    end
  end

  describe 'get a renter' do
    login_user

    it 'returns a renter' do
      get :show, params: { id: renter.id }
      expect(response).to have_http_status(:success)
      expect(assigns(:renter)).to eq(renter)
    end
  end

  describe 'create a new renter' do
    login_user

    it 'creates a new renter' do
      post :create, params: { renter: { user_id: user1.id } }
      expect(response).to have_http_status(:redirect)
      # expect(Renter.all).to eq([renter, Renter.last])
      expect(Renter.last.user_id).to eq(user1.id)
    end
  end

  describe 'delete a renter' do
    login_user

    it 'deletes a renter' do
      delete :destroy, params: { id: renter.id }
      expect(response).to have_http_status(:redirect)
      expect(Renter.all).to_not include(renter)
    end
  end
end
