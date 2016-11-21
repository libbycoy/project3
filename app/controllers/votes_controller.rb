class VotesController < ApplicationController
  def index
    @vote = Vote.new
    @votes = Vote.all
  end

  def create
    @vote = Vote.create(:answer => params[:vote][:answer])
    @vote.save
      if @vote.answer == true
        redirect_to root_path # Sign up was successful
      else
        redirect_to '/votes/show' # Sign up was successful
      end
        @votes = Vote.all
    end

  def show
    @vote = Vote.new
    @votes = Vote.all
  end
end
