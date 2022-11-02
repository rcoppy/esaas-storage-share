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

  get 'subletters/:id/all_listings', to: 'subletters#all_listings'
  get 'subletters/:id/my_listings', to: 'subletters#my_listings'
  # get 'subletters/:user_id/my_listings/:id', to: 'listings#show'

  # get 'renters/:id/all_listings', to: 'listings#index'

  resources :conversations do  #might be not suitable for API
    resources :messages
  end
end
