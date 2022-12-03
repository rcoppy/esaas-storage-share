# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
    # ...
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # manual user route
  resources :users, only: [:show]

  post 'users/email', to: 'users#show_by_email'

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

  get 'renters/:id/all_listings', to: 'renters#all_listings'

  get 'conversations/filter_by_user/:user_id', to: 'conversations#filter_by_user'

  get 'messages/filter_by_conversation/:conversation_id', to: 'messages#filter_by_conversation'

  resources :conversations do
    resources :messages
  end
end
