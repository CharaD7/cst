import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes, { object } from 'prop-types';
import { getTickets } from '../utilities/api';
import Layout from './Layout';
import { setTickets, setOpenTickets } from '../actions';

const mapStateToProps = state => ({
  tickets: state.tickets,
  openTickets: state.openTickets,
});

const mapDispatchToProps = dispatch => ({
  setTickets: tickets => dispatch(setTickets(tickets)),
  setOpenTickets: openTickets => dispatch(setOpenTickets(openTickets)),
});

const Dashboard = ({ history, tickets, setTickets, setOpenTickets }) => {
  const [userId, setUserId] = useState();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      history.push('/sign-in');
    } else {
      if (jwtDecode(jwt).type !== 'Client') history.push('/not-found');
      getTickets(setTickets, setOpenTickets);
      const id = jwtDecode(jwt).id;
      setUserId(id);
    }
  }, [setTickets]);

  return (
    <Layout>
      <div className="p-2 my-3 tickets">
        <h2 className="mb-3">Open Ticket(s)</h2>
        {tickets.filter(ticket => ticket.user_id === userId && ticket.status)
          .length > 0 ? (
          tickets
            .filter(ticket => ticket.user_id === userId && ticket.status)
            .map(tick => (
              <div className="shadow-sm p-3 mb-4 bg-light" key={tick.id}>
                <Link to={`/ticket/${tick.id}`}>
                  <h4 className="text-info">{tick.title}</h4>
                </Link>
                <p>{tick.message}</p>
              </div>
            ))
        ) : (
          <p className="shadow-sm p-3 mb-4 bg-light">
            You have no open tickets.
          </p>
        )}
      </div>

      <div className="p-2 tickets">
        <h2 className="mb-3">Closed Ticket(s)</h2>
        {tickets.filter(ticket => ticket.user_id === userId && !ticket.status)
          .length > 0 ? (
          tickets
            .filter(ticket => ticket.user_id === userId && !ticket.status)
            .map(tick => (
              <div className="shadow-sm p-3 mb-4 bg-light" key={tick.id}>
                <Link className="text-info" to={`/ticket/${tick.id}`}>
                  <h4>{tick.title}</h4>
                </Link>
                <p>{tick.message}</p>
              </div>
            ))
        ) : (
          <p className="shadow-sm p-3 mb-4 bg-light">
            You have no closed tickets.
          </p>
        )}
      </div>
    </Layout>
  );
};

Dashboard.propTypes = {
  tickets: PropTypes.arrayOf(object),
  setTickets: PropTypes.func.isRequired,
  setOpenTickets: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
