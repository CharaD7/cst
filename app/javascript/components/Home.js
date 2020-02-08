import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';

const Home = ({ history }) => {
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const type = jwtDecode(jwt).type;
      if (type === 'Admin') {
        history.push('/admin-dashboard');
      } else if (type === 'Agent') {
        history.push('/agent-dashboard');
      } else if (type === 'Client') {
        history.push('/dashboard');
      }
    }
  });

  return (
    <main className="d-flex flex-column align-items-center main">
      <h2>Welcome to CST</h2>
      <div className="mt-5">
        <Link to="/sign-up" className="btn btn-outline-info mr-2">
          Sign Up
        </Link>
        <Link to="/sign-in" className="btn btn-info">
          Sign In
        </Link>
      </div>
    </main>
  );
};

export default Home;
