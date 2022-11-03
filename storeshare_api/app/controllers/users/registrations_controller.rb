class Users::RegistrationsController < Devise::RegistrationsController
    respond_to :json
  
    include RackSessionFix
  end