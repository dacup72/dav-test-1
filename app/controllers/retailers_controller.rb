class RetailersController < ApplicationController
  def getAllIds
    render(
      status: 200,
      json: RetailerOffer.order(:retailer_id)
    )
  end
  def getAll
    render(
      status: 200,
      json: Retailer.order(:name)
    )
  end
end
