require 'rails_helper'

RSpec.describe Subletter, type: :model do
  describe 'validations' do
    it 'is invalid without a password' do
      subletter = Subletter.new(password: nil)
      subletter.valid?
      expect(subletter.errors).to have_key(:password)
    end

    it 'is invalid with a duplicate email' do
      Subletter.create(email: '', password: 'password')
      subletter = Subletter.new(email: '')
      subletter.valid?
      expect(subletter.errors).to have_key(:email)
    end
  end

  describe 'associations' do
    it 'has many listings' do
      assc = described_class.reflect_on_association(:listings)
      expect(assc.macro).to eq :has_many
    end
  end

  describe 'attributes' do
    it 'has an email' do
      subletter = Subletter.new(email: '')
      expect(subletter.email).to eq('')
    end

    it 'has a phone number' do
      subletter = Subletter.new(phone_number: '1234567890')
      expect(subletter.phone_number).to eq('1234567890')
    end

    it 'has an address' do
      subletter = Subletter.new(address: '123 Main St')
      expect(subletter.address).to eq('123 Main St')
    end

    it 'has a name' do
      subletter = Subletter.new(name: 'John Smith')
      expect(subletter.name).to eq('John Smith')
    end
  end

  # describe 'methods' do
  #   it 'returns a list of all subletters' do
  #     subletter = Subletter.create(email: '', password: 'password', password_confirmation: 'password')
  #     expect(Subletter.all_subletters).to eq([subletter])
  #   end
  # end
end
