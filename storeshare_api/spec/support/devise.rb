# frozen_string_literal: true

require_relative './controller_macros'

RSpec.configure do |config|
  config.include Devise::Test::ControllerHelpers, type: :controller
  config.extend ControllerMacros, type: :controller

  config.include Devise::Test::IntegrationHelpers, type: :request
end