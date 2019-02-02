Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    get :offerByName, to: 'offers#getByName'
    get :testJoin, to: 'offers#testJoin'
    get :allRetailers, to: 'retailers#getAll'
  end
end
