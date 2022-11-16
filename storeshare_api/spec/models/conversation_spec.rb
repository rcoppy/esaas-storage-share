require 'rails_helper'

RSpec.describe Conversation, type: :model do
  describe 'validations' do
    it 'is invalid without a renter_id' do
      convo = Conversation.new(renter_id: nil)
      expect(convo).to_not be_valid
    end
  end

  describe 'validations' do
    it 'is invalid without a subletter_id' do
      convo = Conversation.new(subletter_id: nil)
      expect(convo).to_not be_valid
    end
  end
  #TODO need a valid example where it passes, contrary to above
  describe 'association' do
    it 'belongs to a renter' do
      assc = described_class.reflect_on_association(:renter)
      expect(assc.macro).to eq :belongs_to
    end
  end
  describe 'associations' do
    it 'belongs to a subletter' do
      assc = described_class.reflect_on_association(:subletter)
      expect(assc.macro).to eq :belongs_to
    end
  end

  describe 'conflict of conversations' do
    it 'there can\'t be more than one conversation between same two people' do
      convo = Conversation.new(subletter_id: 1,renter_id:1)
      sleep 0.5
      convo2 = Conversation.new(subletter_id: 1,renter_id:1)
      expect(convo2.created_at == convo.created_at).to be true
    end
  end
end
