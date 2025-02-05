import { Route, Routes} from 'react-router-dom';
import HomePage from './Products';
import Navbar from './comp/Navbar';
import CreateProduct from './pages/AddProduct';
import LoginForm from './pages/LoginForms';
import RegisterForm from './pages/RegisterForm';
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
