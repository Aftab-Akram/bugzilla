Rails.application.routes.draw do

  mount_devise_token_auth_for 'User', at: 'auth'
  resources :projects do
    get 'all_resource'
    get 'all_bugs'
    resources :resources, only: %i(index create destroy) 
    resources :bugs  do
      member do
        patch :change_status
        post :assign_resolver
        delete :remove_resolver 
      end
    end
  end 
end
