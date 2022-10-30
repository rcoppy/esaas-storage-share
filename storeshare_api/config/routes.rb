# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get 'subletters/:id/all_listings', to: 'subletters#all_listings'
  get 'subletters/:id/my_listings', to: 'subletters#my_listings'
end
