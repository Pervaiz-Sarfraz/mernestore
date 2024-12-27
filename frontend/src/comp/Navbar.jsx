import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        <Link to="/" style={styles.link}>
          Product Store 🛒
        </Link>
      </h1>
      <div style={styles.buttons}>
        <Link to="/create" style={styles.button}>
          Add Product
        </Link>
      </div>
      <div style={styles.buttons}
        onClick={() => {
          localStorage.removeItem('token')
          window.location.reload();
        }
        }>
           <Link to="/" style={styles.button}>
          Logout
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    borderBottom: '1px solid #ccc',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    background: 'linear-gradient(to right, cyan, blue)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    padding: '10px 15px',
    marginLeft: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
  },
};

export default Navbar;
