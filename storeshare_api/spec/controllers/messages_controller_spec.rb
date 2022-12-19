# frozen_string_literal: true

require 'rails_helper'
require_relative '../support/devise'

RSpec.describe MessagesController, type: :controller do

  user1 = FactoryBot.create(:user)
  user2 = FactoryBot.create(:user)

  renter1 = FactoryBot.create(:renter, user: user1)
  subletter1 = FactoryBot.create(:subletter, user: user2)
  convo1 = FactoryBot.create(:conversation,renter: renter1, subletter: subletter1)

  message1 = FactoryBot.create(:message, conversation: convo1,user:user1,body:"hi")

  describe 'get a convo' do
    login_user

    it 'returns a convo' do
      # get "/conversations/#{id}/messages", params: { id: convo1.id }
      # visit "/conversations/#{convo1.id}/messages"
      # get :index, params: { id: convo1.id }

      #this works i think
      # get "/conversations/:id/messages/", params: { id: convo1.id }


    end
  end

end
