import React, { useReducer } from 'react';
import axios from 'axios';

// Styles
import '../App.css';

// Components
import Form from './Form';

// Axios

axios.defaults.baseURL = 'http://localhost:5000';

const initialState = { name: '', email: '', surname: '' };

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD INPUT':
      return { ...state, [action.field]: action.payload };
    case 'CLEAR':
      return (state = initialState);
    default:
      return state;
  }
};

const NewUser = ({ setUsersState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD INPUT',
      field: e.target.name,
      payload: e.target.value,
    });
  };
  const addUser = (e) => {
    e.preventDefault();
    axios
      .post('/users', state)
      .then((res) => {
        if (res.data.users) {
          setUsersState(res.data.users);
          dispatch({ type: 'CLEAR' });
        } else {
          return alert('Toks pašto adresas jau užregistruotas');
        }
      })
      .catch((err) => console.log(err))
      .finally();
  };
  return (
    <section>
      <h2>Pridėti dalyvį</h2>

      <Form state={state} handleChange={handleChange} />

      <button className='btnAdd' onClick={addUser} type='submit'>
        Pridėti
      </button>
    </section>
  );
};

export default NewUser;
