# frozen_string_literal: true

class User < ApplicationRecord
  # self.abstract_class = true
  has_many :listings, dependent: :destroy

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  # :confirmable, :lockable, :trackable
end
