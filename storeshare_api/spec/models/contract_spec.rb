# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Contract, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:start_date) }
    it { should validate_presence_of(:renter_id) }
    it { should validate_presence_of(:subletter_id) }
    it { should validate_presence_of(:listing_id) }
    it { should validate_presence_of(:price) }
    it { should validate_presence_of(:end_date) }

    it 'should validate that the start date is not in the past' do
      contract = Contract.new(start_date: Date.today - 1.day)
      contract.valid?
      expect(contract.errors[:start_date]).to include('cannot be in the past')
    end

    it 'should validate that the end date is not before the start date' do
      contract = Contract.new(start_date: Date.today + 1.day, end_date: Date.today)
      contract.valid?
      expect(contract.errors[:end_date]).to include("must be after or equal to #{contract.start_date}")
    end
  end

  describe 'associations' do
    it { should belong_to(:listing) }
    it { should belong_to(:renter) }
    it { should belong_to(:subletter) }
    it { should have_many(:payments) }
  end
end
