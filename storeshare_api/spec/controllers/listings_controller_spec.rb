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
end
