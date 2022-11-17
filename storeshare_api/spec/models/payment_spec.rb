# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Payment, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:amount) }
    it { should validate_presence_of(:due_date) }
    it { should validate_presence_of(:contract_id) }
    it { should validate_presence_of(:subletter_id) }
    it { should validate_presence_of(:renter_id) }
  end

  describe 'associations' do
    it { should belong_to(:contract) }
    it { should belong_to(:subletter) }
    it { should belong_to(:renter) }
  end
end
