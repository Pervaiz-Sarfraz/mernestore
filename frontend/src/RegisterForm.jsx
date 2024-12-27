import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError('Error during registration');
    }
  };

  return (
    <main>
      {error && <p>{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
          <label>
            <input className="input" type="text" placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span>Firstname</span>
          </label>

        <label>
          <input className="input" type="email" placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
          <span>Email</span>
        </label>

        <label>
          <input className="input" type="password" placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
          <span>Password</span>
        </label>
        <button className="submit" type='submit'>Submit</button>
        <p className="signin">Already have an acount ? <Link to='/login'>Signin</Link> </p>
      </form>

    </main>
  );
};

export default RegisterForm;
