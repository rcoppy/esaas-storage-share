require 'rails_helper'

RSpec.describe Subletter, type: :model do
  describe 'validations' do
    it 'is invalid without a user_id' do
      subletter = Subletter.new(user_id: nil)
      expect(subletter).to_not be_valid
    end
  end

  describe 'associations' do
    it 'belongs to a user' do
      assc = described_class.reflect_on_association(:user)
      expect(assc.macro).to eq :belongs_to
    end
  end
end
