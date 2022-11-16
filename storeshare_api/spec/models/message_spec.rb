require 'rails_helper'
#also invalid without user_id
RSpec.describe Message, type: :model do
  describe 'validations' do
    it 'is invalid without a conversation_id' do
      convo = Message.new(conversation_id: nil)
      expect(convo).to_not be_valid
    end
  end

  describe 'validations' do
    it 'is invalid without a user_id' do
      convo = Message.new(user_id: nil)
      expect(convo).to_not be_valid
    end
  end

  describe 'validations' do
    it 'is invalid without a body' do
      convo = Message.new(body: nil)
      expect(convo).to_not be_valid
    end
  end


  describe 'association' do
    it 'belongs to a conversation' do
      assc = described_class.reflect_on_association(:conversation)
      expect(assc.macro).to eq :belongs_to
    end
  end

  describe 'association' do
    it 'belongs to a user' do
      assc = described_class.reflect_on_association(:user)
      expect(assc.macro).to eq :belongs_to
    end
  end





end
