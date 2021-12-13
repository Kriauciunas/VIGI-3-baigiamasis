import React, { useReducer } from 'react';
import axios from 'axios';

// Styles
import '../Styles/UpdateUser.css';

// Components
import Form from './Form';

// Axios
axios.defaults.baseURL = 'http://localhost:5000';

const initialState = { name: '', surname: '', email: '', age: '' };
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD':
      return action.payload;
    case 'UPDATE':
      return { ...state, [action.field]: action.payload };
    case 'CLEAR ':
      return {};
    default:
      return state;
  }
};
const UpdateUser = ({ usersState, setUsersState }) => {
  // State
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSelect = (e) => {
    const userId = e.target.value;
    const user = usersState.find((item) => item._id === userId);
    dispatch({ type: 'LOAD', payload: user });
  };

  const handleChange = (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const { _id, name, email, surname, age } = state;
      const res = await axios.put(`/users/`, {
        _id: _id,
        name: name,
        surname: surname,
        email: email,
        age: +age,
      });
      console.log(res);
      setUsersState(res.data.users);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  return (
    <section>
      <h2>Redaguoti dalyvio duomenis</h2>
      <div className='update'>
        {usersState && (
          <select onChange={(e) => handleSelect(e)}>
            <option key={1} value={''}>
              Pasirinkite dalyvį pagal el. paštą
            </option>
            {usersState.map((item) => (
              <option key={item._id} value={item._id}>
                {item.email}
              </option>
            ))}
          </select>
        )}
        <Form state={state} handleChange={handleChange} />
      </div>
      <input
        className='updateBtn'
        onClick={updateUser}
        type='submit'
        value='Atnaujinti'
      />
    </section>
  );
};

export default UpdateUser;
