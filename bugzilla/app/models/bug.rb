class Bug < ApplicationRecord
  validate :image_type
  validates :name , presence: true, uniqueness: {scope:  :project_id}, on: :create
  validates :status , presence: true
  validates :feature_type, presence: true	
  enum feature_type: {feature: 0, bug: 1}		
  enum status: { new_task: 0, started: 1, completed: 2, resolved: 3 }
  
  belongs_to :project
  belongs_to :user
  has_and_belongs_to_many :users
  has_one_attached :screenshot

private

	def image_type
	   if  screenshot.attached? && !screenshot.content_type.in?(%('image/jpeg image/png'))
	     errors.add(:screenshot, "needs to be a jpeg or png!")
	   end
	end

end
