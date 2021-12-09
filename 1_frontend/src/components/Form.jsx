import React from 'react';

const Form = ({ state, handleChange }) => {
  return (
    <>
      <label htmlFor='name'>Vardas</label>
      <input
        type='text'
        name='name'
        placeholder='Name'
        required
        value={state.name}
        onChange={(e) => handleChange(e)}
      />

      <label htmlFor='surname'>Pavardė</label>
      <input
        type='text'
        name='surname'
        placeholder='Surname'
        required
        value={state.surname}
        onChange={(e) => handleChange(e)}
      />

      <label htmlFor='email'>El. paštas</label>
      <input
        type='email'
        name='email'
        placeholder='Email'
        value={state.email}
        onChange={(e) => handleChange(e)}
        required
      />

      <label htmlFor='age'>Amžius</label>
      <input
        type='number'
        name='age'
        placeholder='Age'
        value={+state.age}
        onChange={(e) => handleChange(e)}
        required
      />
    </>
  );
};

export default Form;