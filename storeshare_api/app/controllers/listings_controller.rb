# frozen_string_literal: true

class ListingsController < ApplicationController
  def index
    @listings = Listing.filter(params.slice(:city, :state, :zip_code, :price, :square_feet))
    render json: @listings
  end

  def show
    @listing = Listing.find(params[:id])
    render json: @listing
  end

  def new
    @listing = Listing.new
  end

  def create
    @listing = Listing.new(listing_params)
    @listing.image.attach(params[:image])

    if @listing.save
      redirect_to @listing
    else
      render :new
    end
  end

  def edit
    @listing = Listing.find(params[:id])
  end

  def update
    @listing = Listing.find(params[:id])
    if @listing.update(listing_params)
      redirect_to @listing
    else
      render :edit
    end
  end

  def destroy
    @listing = Listing.find(params[:id])
    @listing.destroy
    redirect_to listings_path
  end

  def my_listings
    @listings = Listing.where(subletter_id: params[:id])
  end

  private

  def listing_params
    params.require(:listing).permit(:address, :price, :description, :subletter_id, :city, :state, :zip_code,
                                    :square_feet, :image)
  end
end
