Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    get :offers, to: 'offers#index'
    get :testJoin, to: 'offers#testJoin'
  end
end
