class OffersController < ApplicationController
  def getByName
    q = params[:q]
    
    if q.blank?
      render status: 400, json: { error: 'Expected parameter `q` '}
    else
      render(
        status: 200,
        json: Offer.where(["name LIKE ?", "%#{q}%"]).all
      )
    end 
  end
  def getOffersByRetailerId
      q = params[:q]
      r = params[:r]

      render(
        status: 200,
        json: Offer.joins(:retailer_offers).where(retailer_offers: { retailer_id: "#{r}"}).where(["name LIKE ?", "%#{q}%"]).all
      )
  end
end
