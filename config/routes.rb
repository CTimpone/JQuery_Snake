Rails.application.routes.draw do
  root to: "root#show"
  resources :scores, only: [:create, :index]
end
