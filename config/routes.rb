Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :movies, only: [:index, :create, :update, :show, :destroy]
      resources :seats, only: [:create]
    end
  end
  root 'pages#index'
  get '/*path' => 'pages#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
