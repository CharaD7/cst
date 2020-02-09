import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Layout from './Layout';
import { getClients } from '../utilities/api';

const Clients = ({ history }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      history.push('/sign-in');
    } else {
      if (jwtDecode(jwt).type !== 'Admin') history.push('/not-found');
      const userId = Number(jwtDecode(jwt).id);
      getClients(userId, setClients);
    }
  }, [clients]);

  const handlePromotion = () => {};

  return (
    <Layout>
      <div className="tickets p-2">
        <h2 className="mb-4">Clients(s)</h2>
        {clients.map(client => (
          <div className="shadow-sm p-3 mb-4 bg-light" key={client.id}>
            <p>{client.email}</p>
            <hr />
            <button
              type="button"
              onClick={handlePromotion}
              className="btn btn-sm btn-info"
            >
              Promote to agent
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Clients;
