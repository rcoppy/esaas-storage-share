class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @role = Subletter.find_by(user_id: @user.id) || Renter.find_by(user_id: @user.id)

    render json: { user: @user, role: @role }
  end

  def show_by_email
    @user = User.find_by(email: params[:user][:email])

    render json: @user
  end

  private

  def subletter_params
    params.require(:user).permit(:id).permit(:email)
  end
end
