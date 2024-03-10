import React, { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className='flex flex-col w-full items-center justify-center' onSubmit={handleSubmit}>
      <input
        label="Username"
        type="text"
        name="username"
        placeholder='Username'
        value={formData.username}
        onChange={handleChange}
        className="input w-full border-main-blue text-black mb-4"
      />
      <input
        label="Password"
        type="password"
        name="password"
        placeholder='Password'
        value={formData.password}
        onChange={handleChange}
        className="input w-full border-main-blue text-black mb-6"
      />
      <br/>
      <button className='btn w-full bg-main-blue text-base-200' type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
