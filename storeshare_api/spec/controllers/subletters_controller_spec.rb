# frozen_string_literal: true

require 'rails_helper'
require_relative '../support/devise'

RSpec.describe SublettersController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:subletter) { FactoryBot.create(:subletter, user:) }

  describe 'get all listings' do
    login_user

    it 'returns all listings' do
      listing = FactoryBot.create(:listing, subletter:)

      get :all_listings, params: { id: subletter.id }
      expect(response).to have_http_status(:success)
      expect(assigns(:listings)).to eq([listing])
    end
  end

  describe 'get my listings' do
    login_user

    it 'returns the listings of the user' do
      listing = FactoryBot.create(:listing, subletter:)

      get :my_listings, params: { id: subletter.id }
      expect(response).to have_http_status(:success)
      expect(assigns(:listings)).to eq([listing])
    end
  end

  describe 'get a subletter' do
    login_user

    it 'returns a subletter' do
      get :show, params: { id: subletter.id }
      expect(response).to have_http_status(:success)
      expect(assigns(:subletter)).to eq(subletter)
    end
  end

  describe 'create a new subletter' do
    login_user

    it 'creates a new subletter' do
      post :create, params: { subletter: { user_id: user.id } }
      expect(response).to have_http_status(:success)
      expect(Subletter.last.user_id).to eq(user.id)
    end
  end

  describe 'delete a subletter' do
    login_user

    it 'deletes a subletter' do
      delete :destroy, params: { id: subletter.id }
      expect(response).to have_http_status(:redirect)
      expect(Subletter.all).to_not include(subletter)
    end
  end

  describe 'update a subletter' do
    login_user

    it 'updates a subletter' do
      put :update, params: { id: subletter.id, subletter: { user_id: user.id } }
      expect(response).to have_http_status(:success)
      expect(Subletter.last.user_id).to eq(user.id)
    end
  end
end
