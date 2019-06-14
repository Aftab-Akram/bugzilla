class ResourcesController < ApplicationController
  before_action :set_project, only: [:index, :create, :destroy] 
  before_action :set_user, only: [:create, :destroy] 
  
  def index
    @managers = @project.users.managers
    @developers = @project.users.developers
    @qas = @project.users.qas
    render json: {managers: @managers,
                  developers: @developers,
                  qas: @qas}
  end

  def create
    if @project.users << @user
      render json: @project, status: :created, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end   
  end

  def destroy
    if @project.users.destroy(@user)
      render json: @project, status: :created, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end 
  end

  protected
    def set_project
      @project = Project.find(params[:project_id])
      authorize @project
    end
    def set_user
      @user = User.find(params[:id])
    end
end
