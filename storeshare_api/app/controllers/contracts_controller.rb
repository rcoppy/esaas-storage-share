# frozen_string_literal: true

class ContractsController < ApplicationController
  def index
    @contracts = Contract.all
    render json: @contracts
  end

  def show
    @contract = Contract.find(params[:id])
    render json: @contract
  end

  def new
    @contract = Contract.new
  end

  def create
    @contract = Contract.new(contract_params)
    if @contract.save
      render json: @contract
    else
      render json: { error: "couldn't create contract" }
    end
  end

  def edit
    @contract = Contract.find(params[:id])
  end

  def update
    @contract = Contract.find(params[:id])
    if @contract.update(contract_params)
      redirect_to @contract
    else
      render :edit
    end
  end

  def destroy
    @contract = Contract.find(params[:id])
    @contract.destroy
    redirect_to contracts_path
  end

  private

  def contract_params
    params.require(:contract).permit(:start_date, :end_date, :price, :renter_id, :subletter_id, :listing_id)
  end
end
