import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './Products';
import Navbar from './comp/Navbar';
import CreateProduct from './AddProduct';
import LoginForm from './LoginForms';
import RegisterForm from './RegisterForm';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <> 
      {/* Conditionally render the Navbar */}
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage /> : <LoginForm />} />
        <Route path="/create" element={isAuthenticated ? <CreateProduct /> : <LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
}

export default App;
