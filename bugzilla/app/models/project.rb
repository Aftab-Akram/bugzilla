class Project < ApplicationRecord
  has_many :bugs
  belongs_to :user
  has_and_belongs_to_many :users
end
