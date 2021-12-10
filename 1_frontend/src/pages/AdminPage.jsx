import React, { useState } from 'react';
import axios from 'axios';

import NewUser from '../components/NewUser';
import TimesDown from '../components/TimesDown/TimesDown';

// Axios

axios.defaults.baseURL = 'http://localhost:5000';

const Admin = () => {
  // State
  const [usersState, setUsersState] = useState('');

  return (
    <>
      <TimesDown />
      <NewUser usersState={usersState} setUsersState={setUsersState} />
    </>
  );
};

export default Admin;
