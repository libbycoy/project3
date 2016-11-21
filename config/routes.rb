Rails.application.routes.draw do
  root :to => 'votes#index'
  resources :votes

  post '/votes/create' => 'votes#show'

end
