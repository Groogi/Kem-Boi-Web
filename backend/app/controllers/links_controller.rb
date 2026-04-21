class LinksController < ApplicationController
  before_action :authorize_request, except: [:social_links]
  before_action :authorize_admin, only: [:update_social_links, :index, :create, :update, :destroy]

  def index
    @links = Link.all
    render json: @links
  end

  def social_links
    instagram = Link.find_by(label: 'instagram')&.url || ""
    facebook = Link.find_by(label: 'facebook')&.url || ""
    website = Link.find_by(label: 'website')&.url || ""
    
    render json: { instagram: instagram, facebook: facebook, website: website }
  end

  def update_social_links
    [:instagram, :facebook, :website].each do |type|
      if params[type].present?
        link = Link.find_or_initialize_by(label: type.to_s)
        link.url = params[type]
        link.active = true
        link.save
      end
    end

    render json: { message: "Social links updated successfully" }
  end

  def create
    @link = Link.new(link_params)
    if @link.save
      render json: @link, status: :created
    else
      render json: @link.errors, status: :unprocessable_entity
    end
  end

  def update
    @link = Link.find(params[:id])
    if @link.update(link_params)
      render json: @link
    else
      render json: @link.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @link = Link.find(params[:id])
    @link.destroy
    head :no_content
  end

  private

  def link_params
    params.require(:link).permit(:label, :url, :link_type, :location_id, :active)
  end
end
