
require 'pry'
class MessagesController < ApplicationController
  before_action do
    @conversation = Conversation.find(params[:conversation_id])
    # binding.pry
  end
  def index
    @messages = @conversation.messages
    if @messages.length > 10
      @over_ten = true
      @messages = @messages[-10..-1]
    # if params[:m]
    else
      @over_ten = false
      @messages = @conversation.messages
    end #params might need to change below

    #TODO functionality to check if message has been read
    @message = @conversation.messages.new

    render :json => @messages

    # return @messages
  end
  def new
    @message = @conversation.messages.new
  end
  def create
    @message = @conversation.messages.new(message_params)
    if @message.save
      redirect_to conversation_messages_path(@conversation)
    end
  end
  private
  def message_params
    #binding.pry
    params.require(:message).permit(:conversation_id, :body, :user_id)
  end
end