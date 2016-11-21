class Vote < ActiveRecord::Base
  validates :answer, :presence => true
end
