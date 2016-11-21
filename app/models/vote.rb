class Vote < ActiveRecord::Base
  validates :answer, :presence => {:if => 'answer.nil?'}
end
