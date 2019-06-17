class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  def index
    if current_user.manager?
      @projects = current_user.manager_projects
    elsif current_user.developer?
      @projects = current_user.projects
    elsif current_user.qa?
      @projects = Project.all
    end    
    render json: @projects
  end

   def all_resource
    @resources = User.where.not(id: Project.find(params[:project_id]).users)

    render json: {managers: @resources.managers,
                  developers: @resources.developers,
                  qas: @resources.qas}
  end

  def all_bugs
    @bugs = Project.find(params[:project_id]).bugs
    @assign_bugs = current_user.bugs.where( project_id: params[:project_id]).with_attached_screenshot
    @avail_bugs = @bugs.where.not(id: @assign_bugs.ids).with_attached_screenshot

    render json: {assign_bugs: @assign_bugs.map { |bug|
      bug.as_json.merge({ image_url: bug.screenshot.attached? ? rails_blob_url(bug.screenshot) : "http://localhost:3000/bug.jpg" })},
       unassign_bugs: @avail_bugs.map { |bug|
      bug.as_json.merge({ image_url: bug.screenshot.attached? ? rails_blob_url(bug.screenshot) : "http://localhost:3000/bug.jpg" })}}
  end

  def show
    render json: @project
  end

  def create
    @project = current_user.manager_projects.new(project_params)
    authorize @project

    if @project.save
      render json: @project, status: :created, location: @project
    else
      render json: {errors.@project.errors.to_a}, status: :unprocessable_entity
    end
  end

  def update
    if @project.update(project_params)
      render json: @project
    else
      render json: {errors.@project.errors.to_a}, status: :unprocessable_entity
    end
  end

  def destroy
    @project.destroy
  end

  private
    def set_project
      @project = Project.find(params[:id])
      authorize @project
    end

    def project_params
      params.require(:project).permit(:name, :user_id,:project_id)
    end
end
