class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])

    if !@user.nil?
      @renter_data = Renter.find_by(user_id: @user.id)
      @subletter_data = Subletter.find_by(user_id: @user.id)

      render json: { user: @user, renter_data: @renter_data, subletter_data: @subletter_data }, status: :ok
    else
      render json: { user: nil, renter_data: nil, subletter_data: nil }, status: :not_found
    end
  end

  def show_by_email
    @user = User.find_by(email: params[:user][:email])

    if !@user.nil?
      @renter_data = Renter.find_by(user_id: @user.id)
      @subletter_data = Subletter.find_by(user_id: @user.id)

      render json: { user: @user, renter_data: @renter_data, subletter_data: @subletter_data }, status: :ok
    else
      render json: { user: nil, renter_data: nil, subletter_data: nil }, status: :not_found
    end
  end

  private

  def subletter_params
    params.require(:user).permit(:id).permit(:email)
  end
end
