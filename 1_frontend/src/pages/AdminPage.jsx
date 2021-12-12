import React, { useState } from 'react';

// Components
import NewUser from '../components/NewUser';
import TimesDown from '../components/TimesDown/TimesDown';

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
