class ConversationsController < ApplicationController
  # before_action :authenticate_user
  def index
    @users = User.all
    @conversations = Conversation.all

  end
  def create
    if Conversation.between(params[:renter_id], params[:subletter_id])
                   .present?
      @conversation = Conversation.between(params[:renter_id],
                                           params[:subletter_id]).first
    else
      @conversation = Conversation.create!(conversation_params)
    end
    redirect_to conversation_messages_path(@conversation)
  end
  private
  def conversation_params
    params.permit(:renter_id, :subletter_id) #
  end
end