require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it 'is invalid without an email' do
      user = User.new(email: nil)
      expect(user).to_not be_valid
    end

    it 'is invalid without a password' do
      user = User.new(password: nil)
      expect(user).to_not be_valid
    end

    it 'is invalid without a password confirmation' do
      user = User.new(password_confirmation: nil)
      expect(user).to_not be_valid
    end

    it 'is invalid if password and password confirmation do not match' do
      user = User.new(password: 'password', password_confirmation: 'notpassword')
      expect(user).to_not be_valid
    end

    it 'is invalid if email is not unique' do
      User.create(email: '', password: 'password', password_confirmation: 'password')
      user = User.new(email: '', password: 'password', password_confirmation: 'password')
      expect(user).to_not be_valid
    end
  end
end
