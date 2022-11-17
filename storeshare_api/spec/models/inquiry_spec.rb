# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Inquiry, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:start_date) }
    it { should validate_presence_of(:end_date) }
    it { should validate_presence_of(:renter_id) }
    it { should validate_presence_of(:listing_id) }

    it 'should validate that the start date is not in the past' do
      inquiry = build(:inquiry, start_date: Date.yesterday)
      inquiry.valid?
      expect(inquiry.errors[:start_date]).to include('cannot be in the past')
    end

    it 'should validate that the end date is not before the start date' do
      inquiry = build(:inquiry, end_date: Date.yesterday)
      inquiry.valid?
      expect(inquiry.errors[:end_date]).to include('cannot be before start date')
    end
  end

  describe 'associations' do
    it { should belong_to(:listing) }
    it { should belong_to(:renter) }
    it { should have_one(:conversation) }
    it { should have_one(:subletter).through(:listing) }
  end
end
