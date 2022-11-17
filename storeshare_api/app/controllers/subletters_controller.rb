# frozen_string_literal: true

class SublettersController < ApplicationController
  def index
    @subletters = Subletter.all
    render json: @subletters
  end

  def show
    @subletter = Subletter.find(params[:id])
    render json: @subletter
  end

  def new
    @subletter = Subletter.new
  end

  def create
    @subletter = Subletter.new(subletter_params)

    # validation TODO: check that user_id submitted isn't already affiliated
    # with a different subletter profile

    if @subletter.save
      render json: @subletter
    else
      render json: { error: "couldn't create subletter" }
    end
  end

  def edit
    @subletter = Subletter.find(params[:id])
  end

  def update
    @subletter = Subletter.find(params[:id])
    if @subletter.update(subletter_params)
      render json: @subletter
    else
      render :edit
    end
  end

  def destroy
    @subletter = Subletter.find(params[:id])
    @subletter.destroy
    redirect_to subletters_path
  end

  def all_listings
    @listings = Listing.all
    render json: @listings
  end

  def my_listings
    @listings = Listing.where(subletter_id: params[:id])
    render json: @listings
  end

  private

  def subletter_params
    params.require(:subletter).permit(:email, :phone_number, :address, :name, :password, :user_id)
  end
end
