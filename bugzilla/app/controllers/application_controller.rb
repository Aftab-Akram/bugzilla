class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordNotUnique, with: :render_not_unique
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  include Pundit
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :email, :password, :role])
    end
    
    def render_unprocessable_entity_response(exception)
      render json: {errors: exception.record.errors}, status: :unprocessable_entity
    end

    def render_not_found_response(exception)
      render json: { errors: exception.message }, status: :not_found
    end

    def render_not_unique(exception)
      render json: {errors: exception.message}, status: :unprocessable_entity 
    end

    def user_not_authorized(exception)
      render json: {errors: "You don't have the permission for this action"}, status: :unprocessable_entity 
    end      
end
