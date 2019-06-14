class ResourcePolicy < ApplicationPolicy
  def index?
    true
  end
 
  def create?
    return true if user.manager? && user == project.user
  end
 
  def destroy?
    return true if user.manager? && user == project.user
  end
 
  private
 
    def project
      record
    end
end