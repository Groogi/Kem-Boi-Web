Rails.application.routes.draw do
  get "links/index"
  get "links/create"
  get "links/update"
  get "links/destroy"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  get "/users_list", to: "users#index"
  post "/register", to: "users#create"
  post "/login", to: "authentication#login"
  put "/update_profile", to: "users#update"
  put "/users/:id", to: "users#admin_update"
  delete "/users/:id", to: "users#destroy"
  post "/users/:id/add_points", to: "users#add_points"
  post "/transactions/quick_add", to: "transactions#quick_add"
  resources :transactions, only: [:index, :create]
  get "/users/:id/transactions", to: "transactions#user_transactions"
  resources :giveaways
  resources :locations
end
