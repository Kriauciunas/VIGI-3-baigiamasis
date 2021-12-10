import React, { useState, useEffect } from 'react';
import axios from 'axios';

// components
import UpdateUser from '../components/UpdateUser';
import Table from '../components/Table';

axios.defaults.baseURL = 'http://localhost:5000';

const UsersPage = () => {
  // State
  const [usersState, setUsersState] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function
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
      <h1>Renginio dalyviai</h1>
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
      <UpdateUser usersState={usersState} setUsersState={setUsersState} />
    </>
  );
};

export default UsersPage;
