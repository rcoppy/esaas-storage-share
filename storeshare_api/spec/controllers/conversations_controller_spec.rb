# frozen_string_literal: true

require 'rails_helper'
require_relative '../support/devise'

RSpec.describe ConversationsController, type: :controller do
  user1 = FactoryBot.create(:user)
  user2 = FactoryBot.create(:user)

  renter1 = FactoryBot.create(:renter, user: user1) #
  subletter1 = FactoryBot.create(:subletter, user: user2)
  convo1 = FactoryBot.create(:conversation,renter: renter1, subletter: subletter1)

  # let! (:user1) { FactoryBot.create(:user)}
  # let! (:user2) { FactoryBot.create(:user)}
  #
  # let!(:renter1) { FactoryBot.create(:renter, user: user1) }
  # let!(:subletter1) { FactoryBot.create(:subletter, user: user2) }
  # let!(:convo1) { FactoryBot.create(:conversation, renter: renter1,subletter: subletter1) }

  describe 'try to access index' do
    login_user

    it 'index access to controller returns 204' do
      get :index
      expect(response).to have_http_status(:no_content)
    end
  end

  describe 'create a new conversation' do
    login_user

    it 'creates a new conversation' do
      post :create, params:  { sender_id: renter1.id, recipient_id: subletter1.id }
      expect(response).to have_http_status(:redirect)
      # expect(Renter.all).to eq([renter, Renter.last])
      expect(Conversation.last.id).to eq(convo1.id)
    end
  end


end