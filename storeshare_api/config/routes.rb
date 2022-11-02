# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :subletters
  resources :renters
  resources :listings

  resources :subletters do
    resources :listings
  end

  resources :renters do
    resources :listings
  end

  root 'listings#index'

  get 'subletters/:id/all_listings', to: 'listings#index', as: 'all_listings'
  get 'subletters/:id/my_listings', to: 'listings#my_listings', as: 'my_listings'
  # get 'subletters/:user_id/my_listings/:id', to: 'listings#show'

  # get 'renters/:id/all_listings', to: 'listings#index'
end
