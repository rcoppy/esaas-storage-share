class ConversationsController < ApplicationController
  # before_action :authenticate_user

  def index
    @users = User.all
    @conversations = Conversation.all
  end

  def create
    @conversation = if Conversation.between(params[:sender_id], params[:recipient_id])
                                   .present?
                      Conversation.between(params[:sender_id],
                                           params[:recipient_id]).first
                    else
                      Conversation.create!(conversation_params)
                    end
    redirect_to conversation_messages_path(@conversation)
  end

  def filter_by_user
    renter_id = Renter.where(user_id: params[:id]).first&.id
    subletter_id = Subletter.where(user_id: params[:id]).first&.id

    @conversations = Conversation.where('renter_id = ? OR subletter_id = ?',
                                        renter_id, subletter_id)

    render json: @conversations
  end

  private

  def conversation_params
    params.permit(:sender_id, :recipient_id)
  end
end
