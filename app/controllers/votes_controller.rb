class VotesController < ApplicationController
  def index
    @vote = Vote.new
    @votes = Vote.all
  end

  def create
    # if params[:answer].nil?
    #   redirect_to '/votes/show' # Sign up was successful
    # else
      @vote = Vote.create(:answer => params[:vote][:answer])
      redirect_to root_path
      @vote.save
    # end
    @votes = Vote.all
    end

  def show
    @vote = Vote.new
    @votes = Vote.all
  end
end
