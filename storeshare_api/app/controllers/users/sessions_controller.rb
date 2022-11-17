require 'pry'

class Users::SessionsController < Devise::SessionsController
    respond_to :json
  
    private
  
    def respond_with(resource, _opts = {})
    # binding.pry
      if !resource.nil? then
        renter_data = Renter.find_by(user_id: resource.id)
        subletter_data = Subletter.find_by(user_id: resource.id)

        render json: { user: resource, renter_data: renter_data, subletter_data: subletter_data }, status: :ok
      else
        render json: { user: nil, renter_data: nil, subletter_data: nil }, status: :not_found
      end

      # render json: resource, status: :ok
    end
  
    def respond_to_on_destroy
      log_out_success && return if current_user
  
      log_out_failure
    end
  
    def log_out_success
      render json: { message: "You are logged out." }, status: :ok
    end
  
    def log_out_failure
      render json: { message: "Hmm nothing happened."}, status: :unauthorized
    end
  end