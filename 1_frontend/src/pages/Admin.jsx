import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import NewUser from '../components/NewUser';

// Axios

axios.defaults.baseURL = 'http://localhost:5000';

const Admin = () => {
  // State
  const [usersState, setUsersState] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Functions

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/users');
      console.log(res.data);
      setUsersState(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <header>
        <h1>Kalėdos 2021</h1>
      </header>
      <main>
        <section>
          <h2>Dalyviai</h2>

          {loading ? (
            <h4>...Loading...</h4>
          ) : (
            <div>
              {error && error.message}
              {usersState && (
                <Table usersState={usersState} setUsersState={setUsersState} />
              )}
            </div>
          )}
        </section>
        <NewUser usersState={usersState} setUsersState={setUsersState} />
      </main>
    </>
  );
};

export default Admin;
