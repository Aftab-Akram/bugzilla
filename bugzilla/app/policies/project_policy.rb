class ProjectPolicy < ApplicationPolicy
  def index?
    true
  end
 
  def create?
    user.manager?
  end

  def show?
    true
  end
 
  def update?
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