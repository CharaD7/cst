# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

Comment.delete_all
Ticket.delete_all
User.delete_all

p 'Db erased'

User.create!(
  email: 'admin@admin.com',
  password: '123456',
  type: 'Admin'
)

p 'Administrator created'

User.create!(
  email: 'agent@agent.com',
  password: '123456',
  type: 'Agent'
)

4.times do
  User.create!(
    email: Faker::Internet.email,
    password: '123456',
    type: 'Agent'
  )
end

p 'Agents created'

16.times do
  User.create!(
    email: Faker::Internet.email,
    password: '123456',
    type: 'Client'
  )
end

p 'Clients created'

User.create!(
  email: 'client@client.com',
  password: '123456',
  type: 'Client'
)
agent_ids = []
User.all.each do |user|
  agent_ids << user.id if user.agent?
  next unless user.client?

  6.times do
    user.tickets.create!(
      title: Faker::Music.album,
      message: Faker::Quote.matz,
      user_email: user.email
    )
  end
end

p 'Tickets created'

User.all.each do |user|
  next unless user.client?

  user.tickets[0..3].each do |user_ticket|
    id = agent_ids.sample
    user_ticket.comments.create!(
      user_id: id,
      user_email: User.find(id).email,
      ticket_id: user_ticket.id,
      message: Faker::Quote.matz
    )
  end
end

p 'Ticket comments created'

User.all.each do |user|
  next unless user.client?

  user.tickets[2..3].each do |user_ticket|
    user_ticket.update_attributes!(status: false)
  end
end

p 'Two tickets closed from each client ticket'
