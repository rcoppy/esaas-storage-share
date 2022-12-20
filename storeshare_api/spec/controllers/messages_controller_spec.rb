# frozen_string_literal: true

require 'rails_helper'
require_relative '../support/devise'
require 'pry'

RSpec.describe MessagesController, type: :controller do

  user1 = FactoryBot.create(:user)
  user2 = FactoryBot.create(:user)

  renter1 = FactoryBot.create(:renter, user: user1)
  subletter1 = FactoryBot.create(:subletter, user: user2)
  convo1 = FactoryBot.create(:conversation,renter: renter1, subletter: subletter1)

  message1 = FactoryBot.create(:message, conversation: convo1,user:user1,body:"hi1")

  describe 'get messages has less than 10' do
    login_user
    it 'gets messages' do
      get :index, params: { conversation_id: convo1.id }
      expect(response).to have_http_status(:success)
      expect(Message.last.id).to eq(message1.id)
    end
  end

  describe 'create messages' do
    login_user

    it 'creates a message' do

      post :create, params: { conversation_id:convo1.id, message: {conversation_id:convo1.id ,body:"hiii",user_id:user1.id}  }

      expect(response).to have_http_status(:redirect)
      binding.pry
      expect(Message.all).to match_array([message1, Message.last])
    end
  end

end

