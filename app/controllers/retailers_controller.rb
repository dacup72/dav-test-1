class RetailersController < ApplicationController
  def getAll
    render(
      status: 200,
      json: Retailer.order(:name)
    )
  end
end
