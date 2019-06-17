class BugsController < ApplicationController
  before_action :set_bug, only: [:show, :update, :destroy, :change_status, :assign_resolver, :remove_resolver]
  before_action :authenticate_user!
  def index
    @bugs = User.first.bug_reports.with_attached_screenshot
    render json: @bugs.map { |bug|
      bug.as_json.merge({ image_url: bug.screenshot.attached? ? rails_blob_path(bug.screenshot) : "http://localhost:3000/bug.jpg" })}
  end


  def create
    @bug = current_user.bug_reports.new(bug_params)
    if @bug.screenshot.attached?
      @image_url = rails_blob_url(@bug.screenshot)
    else
      @image_url = 'http://localhost:3000/bug.jpg'
    end

    if @bug.save
      render json: {bug: @bug, image_url: @image_url , status: :created}
    else
      render json: {errors: @bug.errors.to_a}, status: :unprocessable_entity
    end
  end

  def destroy
    @bug.screenshot.purge
    if @bug.destroy
      render json: { status: :ok}
    else
      render json: {errors: @bug.errors.to_a}, status: :unprocessable_entity  
    end

  end

  def show
    render json: @bug
  end

  def update
    if @bug.update(bug_params)
      render json: @bug
    else
      render json: {errors: @bug.errors.to_a}, status: :unprocessable_entity
    end
  end

  def change_status
    if @bug.update_attributes(status_params)
        render json: @bug, status: :ok
      else
        render json: {errors: @bug.errors.to_a}, status: :unprocessable_entity
    end
  end

   def assign_resolver
    if current_user.bugs << @bug
        render json: current_user, status: :created
    else
        render json: {errors: current_user.errors.to_a}, status: :unprocessable_entity
    end
  end

  def remove_resolver
    if current_user.bugs.destroy(@bug)
        render json: current_user, status: :created
      else
        render json: {errors: current_user.errors.to_a}, status: :unprocessable_entity
      end
  end

  private
    def set_bug
      @bug = Bug.find(params[:id])
      authorize @bug
      if @bug.screenshot.attached?
        @image_url = rails_blob_url(@bug.screenshot)
      else
        @image_url = 'http://localhost:3000/bug.jpg'
      end
    end

    def bug_params
      params.require(:bug).permit(:name,:status,:project_id, :screenshot, :feature_type, :description)
    end

    def status_params
      params.require(:bug).permit(:status)
    end
end
