# frozen_string_literal: true

class RentersController < ApplicationController
  def index
    @renters = Renter.all
  end

  def show
    @renter = Renter.find(params[:id])
  end

  def new
    @renter = Renter.new
  end

  def create
    @renter = Renter.new(renter_params)
    if @renter.save
      redirect_to @renter
    else
      render :new
    end
  end

  def edit
    @renter = Renter.find(params[:id])
  end

  def update
    @renter = Renter.find(params[:id])
    if @renter.update(renter_params)
      redirect_to @renter
    else
      render :edit
    end
  end

  def destroy
    @renter = Renter.find(params[:id])
    @renter.destroy
    redirect_to renters_path
  end

  private

  def renter_params
    params.require(:renter).permit(:email, :phone_number, :address, :name, :password, :password_confirmation)
  end
end
