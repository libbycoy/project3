class VotesController < ApplicationController
  def index
    @vote = Vote.new
    @votes = Vote.all
  end

  def create
    # if params[:answer].nil?
    #   redirect_to '/votes/show' # Sign up was successful
    # else
    # p params

      @vote = Vote.create(:answer => params[:answer])
      @vote.save
    # end

    # @votes = Vote.all

    #
    # true_votes = @votes.where(:answer => true).count
    # false_votes = @votes.where(:answer => false).count

    vote_count = Vote.group(:answer).count
    p vote_count

    render :json => vote_count, :status => :ok

    end

  def show
    @vote = Vote.new
    @votes = Vote.all
  end
end
