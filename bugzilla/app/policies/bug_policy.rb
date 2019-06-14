class BugPolicy < ApplicationPolicy
  def index?
    true
  end
 
  def create?
    user.qa?
  end

  def show?
    true
  end
 
  def update?
    return true if user.qa?
  end
 
  def destroy?
    return true if user.qa?
  end

  def change_status?
    return bug.users.find_by_id(user.id).present? && user.developer?
  end

  def assign_resolver?
    return true if user.developer?
  end

  def remove_resolver?
    return bug.users.find_by_id(user.id).present? && user.developer?
  end
 
  private
 
    def bug
      record
    end
end