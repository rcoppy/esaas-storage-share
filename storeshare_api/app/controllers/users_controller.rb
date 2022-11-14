class UsersController < ApplicationController

    def show
        @user = User.find(params[:id])
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
