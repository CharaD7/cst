import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import AdminDashboard from './AdminDashboard';
import AgentDashboard from './AgentDashboard';
import Ticket from './Ticket';
import TicketForm from './TicketForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/new-ticket" exact component={TicketForm} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/ticket/:id" component={Ticket} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/agent-dashboard" component={AgentDashboard} />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
}

export default App;
