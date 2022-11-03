# frozen_string_literal: true

require 'rails_helper'
require_relative '../support/devise'

RSpec.describe ListingsController, type: :controller do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:user2) { FactoryBot.create(:user) }

  let!(:subletter1) { FactoryBot.create(:subletter, user: user1) }
  let!(:subletter2) { FactoryBot.create(:subletter, user: user2) }

  let!(:listing1) { FactoryBot.create(:listing, subletter: subletter1) }
  let!(:listing2) { FactoryBot.create(:listing, subletter: subletter2) }

  describe 'get all listings' do
    login_user

    it 'returns all listings' do
      get :index, params: { id: subletter1.id }
      expect(response).to have_http_status(:success)
      expect(assigns(:listings)).to eq([listing1, listing2])
    end
  end

  describe 'get a listing' do
    login_user

    it 'returns a listing' do
      get :show, params: { id: listing1.id }
      expect(response).to have_http_status(:success)
      expect(assigns(:listing)).to eq(listing1)
    end
  end

  describe 'create a listing' do
    login_user

    it 'creates a listing' do
      post :create,
           params: { listing: { subletter_id: subletter1.id, address: '123 Main St', price: 100.0,
                                description: 'test' } }
      expect(response).to have_http_status(:redirect)
      expect(Listing.all).to eq([listing1, listing2, Listing.last])
    end
  end

  describe 'delete a listing' do
    login_user

    it 'deletes a listing' do
      delete :destroy, params: { id: listing1.id }
      expect(response).to have_http_status(:redirect)
      expect(Listing.all).to eq([listing2])
    end
  end

  describe 'update a listing' do
    login_user

    it 'updates a listing' do
      put :update, params: { id: listing1.id, listing: { address: '123 Main St', price: 100.0, description: 'test' } }
      expect(response).to have_http_status(:redirect)
      expect(Listing.all).to match_array([listing1, listing2])
    end
  end
end
