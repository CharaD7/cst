# frozen_string_literal: true

include ActionView::Helpers::DateHelper
class Api::V1::TicketsController < ApplicationController
  def create
    @ticket = Ticket.new(ticket_params)
    if @ticket.save
      render json: @ticket
    else
      render json: @ticket.errors
    end
  end

  def index
    @tickets = Ticket.all
    @recently_closed_tickets = Ticket.recently_closed
    if params[:format] != 'pdf'
      render json: @tickets
      return
    end
    render json: @tickets unless params[:format] == 'pdf'

    respond_to do |format|
      format.html

      format.pdf do
        pdf = TicketsPdf.new(@recently_closed_tickets)
        send_data pdf.render,
                  filename: "Processed tickets from #{30.days.ago.strftime('%B %d, %Y')} till present",
                  type: 'application/pdf'
      end
    end
  end

  def show
    @ticket = Ticket.find_by(id: params[:id])
    render json: {
      title: @ticket.title,
      message: @ticket.message,
      status: @ticket.status,
      created_at: time_ago_in_words(@ticket.created_at),
      updated_at: time_ago_in_words(@ticket.updated_at)
    }
  end

  def update
    return unless user.admin? || user.agent?

    @ticket = Ticket.find(params[:id])
    @ticket.update_attributes(status: false)
    render json: @ticket
  end

  private

  def user
    User.find(params[:user_id])
  end

  def ticket_params
    params.permit(:title, :message, :status, :user_id, :user_email)
  end
end
