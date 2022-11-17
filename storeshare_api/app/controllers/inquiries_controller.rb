# frozen_string_literal: true

class InquiriesController < ApplicationController
  def index
    @inquiries = Inquiry.all
    render json: @inquiries
  end

  def show
    @inquiry = Inquiry.find(params[:id])
    render json: @inquiry
  end

  def new
    @inquiry = Inquiry.new
  end

  def create
    @inquiry = Inquiry.new(inquiry_params)
    if @inquiry.save
      redirect_to @inquiry
    else
      render :new
    end
  end

  def edit
    @inquiry = Inquiry.find(params[:id])
  end

  def update
    @inquiry = Inquiry.find(params[:id])
    if @inquiry.update(inquiry_params)
      redirect_to @inquiry
    else
      render :edit
    end
  end

  def destroy
    @inquiry = Inquiry.find(params[:id])
    @inquiry.destroy
    redirect_to inquiries_path
  end

  private

  def inquiry_params
    params.require(:inquiry).permit(:start_date, :end_date, :renter_id, :listing_id)
  end
end
