Rails.application.routes.draw do
  get 'mynew/comment', to:"new#comment"
  get 'mynew/concert', to:"new#concert"
  get 'mynew/piece', to:"new#piece"
  get 'mynew/composer', to:"new#composer"
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
