Rails.application.routes.draw do
  # Health check
  get "up" => "rails/health#show", as: :rails_health_check

  # API Routes
  post "/register", to: "users#create"
  post "/login", to: "authentication#login"
  post "/auth/google", to: "google_auth#create"
  get "/profile", to: "users#profile"
  put "/profile", to: "users#update"
  post "/password/forgot", to: "passwords#forgot"
  post "/password/reset", to: "passwords#reset"

  # Admin User routes
  get "/users_list", to: "users#index"
  delete "/users/:id", to: "users#destroy"
  put "/users/:id", to: "users#admin_update"
  post "/users/:id/add_points", to: "users#add_points"
  post "/transactions/quick_add", to: "transactions#quick_add"
  get "/transactions", to: "transactions#index"

  # Unified Loyalty Routes
  resources :locations
  resources :rewards
  resources :redemptions, only: [ :index, :update, :destroy ]

  post "/rewards/:id/claim", to: "redemptions#create"
  post "/redemptions/direct_fulfill", to: "redemptions#direct_fulfill"
  get "/my_redemptions", to: "redemptions#my_redemptions"

  resources :links
  get "/social_links", to: "links#social_links"
  put "/social_links", to: "links#update_social_links"


end
