class Api::V1::ProductsController < ApplicationController
  def index
    @products = Product.all

    if @products
      render json: @products, status: :ok
    else
      render json: {}, status: :not_found
    end
  end
end
