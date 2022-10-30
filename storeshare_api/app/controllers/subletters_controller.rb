# frozen_string_literal: true

class SublettersController < ApplicationController
  def index
    @subletters = Subletter.all
  end

  def show
    @subletter = Subletter.find(params[:id])
  end

  def new
    @subletter = Subletter.new
  end

  def create
    @subletter = Subletter.new(subletter_params)
    if @subletter.save
      redirect_to @subletter
    else
      render :new
    end
  end

  def edit
    @subletter = Subletter.find(params[:id])
  end

  def update
    @subletter = Subletter.find(params[:id])
    if @subletter.update(subletter_params)
      redirect_to @subletter
    else
      render :edit
    end
  end

  def destroy
    @subletter = Subletter.find(params[:id])
    @subletter.destroy
    redirect_to subletters_path
  end

  private

  def subletter_params
    params.require(:subletter).permit(:email, :phone_number, :address, :name, :password, :password_confirmation)
  end
end
