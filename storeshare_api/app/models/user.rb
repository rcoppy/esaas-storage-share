# frozen_string_literal: true



class User < ApplicationRecord

  # include Devise::JWT::RevocationStrategies::Denylist

  # self.abstract_class = true
  has_many :listings, dependent: :destroy

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable, # :rememberable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
  # :confirmable, :lockable, :trackable

  # def on_jwt_dispatch(token, payload)
  #   super
  #   # do_something(token, payload)
  # end
end
