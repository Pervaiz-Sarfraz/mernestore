import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginForms = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store the token
      navigate('/'); // Redirect to homepage after login
      window.location.reload(); // Reload the page to refresh the main page
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
          <form className="form" onSubmit={handleSubmit}>
        <p className="title">Login </p>
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
        <button className="submit">Submit</button>
        <p className="signin">Don't have an acount ? <Link to='/register'>Register</Link> </p>
      </form>
    </div>
  );
};

export default LoginForms;
