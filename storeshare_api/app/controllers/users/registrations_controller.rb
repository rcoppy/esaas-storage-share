class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  include RackSessionFix

  before_action :configure_sign_up_params, only: [:create]

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name profile_picture])
  end
end
