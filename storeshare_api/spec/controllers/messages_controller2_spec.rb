
# frozen_string_literal: true

require 'rails_helper'
require_relative '../support/devise'

RSpec.describe MessagesController, type: :controller do

  user1 = FactoryBot.create(:user)
  user2 = FactoryBot.create(:user)

  renter1 = FactoryBot.create(:renter, user: user1)
  subletter1 = FactoryBot.create(:subletter, user: user2)
  convo1 = FactoryBot.create(:conversation,renter: renter1, subletter: subletter1)

  message1 = FactoryBot.create(:message, conversation: convo1,user:user1,body:"hi1")
  message2 = FactoryBot.create(:message, conversation: convo1,user:user1,body:"hi2")
  message3 = FactoryBot.create(:message, conversation: convo1,user:user1,body:"hi3")
  message4 = FactoryBot.create(:message, conversation: convo1,user:user1,body:"hi4")
  message5 = FactoryBot.create(:message, conversation: convo1,user:user1,body:"hi5")
  message6 = FactoryBot.create(:message, conversation: convo1,user:user1,body:"hi6")
  message7 = FactoryBot.create(:message, conversation: convo1,user:user1,body:"hi7")
  message8 = FactoryBot.create(:message, conversation: convo1,user:user1,body:"hi8")
  message9 = FactoryBot.create(:message, conversation: convo1,user:user1,body:"hi9")
  message10 = FactoryBot.create(:message, conversation: convo1,user:user1,body:"hi10")
  message11 = FactoryBot.create(:message, conversation: convo1,user:user1,body:"hi11")

  describe 'get messages has more than 10' do
    login_user
    it 'gets messages for 11 message' do
      get :index, params: { conversation_id: convo1.id }
      expect(response).to have_http_status(:success)
      # expect(Message.last.id).to eq(message1.id)
      expect(assigns(:messages)).to eq([message2,message3,message4,message5,message6,message7,message8,message9,message10,message11])
    end
  end


end
