class UsersController < ApplicationController
    def show
        @user = User.find(params[:id])
    end

    private

    def subletter_params
        params.require(:user).permit(:id)
    end
end
