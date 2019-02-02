class OffersController < ApplicationController
  def index
    q = params[:q]
    
    if q.blank?
      render status: 400, json: { error: 'Expected parameter `q` '}
    else
      render(
        status: 200,
        json: Offer.where(["name LIKE ?", "%#{q}%"]).limit(100)
      )
    end 
  end

  def testJoin
      render(
        status: 200,
        json: Offer.joins(:retailer_offers).where(retailer_offers: { retailer_id: 3 })
      )
  end
end
