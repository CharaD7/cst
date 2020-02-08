import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Layout from './Layout';
import { getAgents } from '../utilities/api';

const Agents = ({ history }) => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      history.push('/sign-in');
    } else {
      if (jwtDecode(jwt).type !== 'Admin') history.push('/not-found');
      const userId = Number(jwtDecode(jwt).id);
      getAgents(userId, setAgents);
    }
  }, [agents]);

  return (
    <Layout>
      <div className="tickets p-2">
        <h2 className="mb-4">Agents(s)</h2>
        {agents.map(agent => (
          <div className="shadow-sm p-3 mb-4 bg-light" key={agent.id}>
            <p>{agent.email}</p>
            <small className="font-italic">
              Became an agent on {Date(agent.updated_at).split('GMT')[0]}
            </small>
            <hr />
            <button className="btn btn-sm btn-info" type="button">
              Promote to admin
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Agents;