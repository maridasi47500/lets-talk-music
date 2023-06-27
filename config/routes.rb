Rails.application.routes.draw do
  get 'new/comment'
  resources :comments
  root "posts#index"
  resources :concerts
  resources :pieces
  resources :composers
  resources :posts
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
