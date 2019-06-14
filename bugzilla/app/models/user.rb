# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  
  enum role: { manager: 0,developer: 1, qa: 2}
  has_many :manager_projects, class_name: "Project"
  has_many :bug_reports, class_name: "Bug"
  
  has_and_belongs_to_many :projects
  has_and_belongs_to_many :bugs

  scope :managers, -> { where  role: :manager}
  scope :developers, -> { where  role: :developer}
  scope :qas, -> { where  role: :qa}
end
