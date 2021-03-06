Welcome to Customer Support Ticketing System 👋

This is a customer support ticketing system that allows customers to be able to place support requests such that support agents/admins can respond to the requests.

## Usage

1. Open `config/database.yml` and change password to your local machine's MySQL root password. In that file, change the line that looks similar to the code below. Change the `123456` to your local machine password.

password: "123456"

2. Install dependencies

bundle install
yarn install

3. Setup the database.

rails db:create
rails db:migrate
rails db:seed

OR

rails db:setup

4. Login with the details below as needed. One login details each for admin, client, and agent.

- 1 administator. Login details:

Username: admin@admin.com
Password: '123456'


- 5 agents. Login details of one of them:

Username: agent@agent.com
Password: '123456'

- 17 clients. Login details of one of them:

Username: client@client.com
Password: '123456'

5. Run `rails s` to run the application.

6. Navigate to `http://localhost:3000` in your browser to view home page.

## Run tests

rspec

## Thought process

### Clients

Tickets can only be created by Clients. A client can see all open or closed tickets. A client can not comment on a newly created ticket until an agent or admin comments on it.

### Agents

An agent can see open tickets and process any of them, the tickets are arranged in reversed order, meaning last created ticket appears last on the list. Agents can also close the tickets once it has been successfuly resolved. Agent can download recently closed/processed (30 days) tickets as PDF.

### Admins

An admin can see open tickets and process any of them, the tickets are arranged in reversed order, meaning last created ticket appears last on the list. Admin can download recently closed/processed (30 days) tickets as PDF. Admins can also close the tickets once it has been successfuly resolved. Admin can also view clients, agents, and admins. Admin can promote or demote a user to a client, agent, or admin. Admin can not demote any other admin.

## Technologies Used

- React
- Ruby on Rails
- Redux
- Yarn
- MySQL
- Rspec
- Bootstrap
- SCSS

## Things to note

- This is a REST API rails backend.
- React is used in the frontend using react-rails gem.
- React handles all routes except API calls and PDF file download.
- Prawn PDF generator is used to generate the PDF.

## To-do List

- Add more test coverage.
- Refactor code.
- Name all URLs and import them from `constants.js` instead of directly inputing them in Axios calls.