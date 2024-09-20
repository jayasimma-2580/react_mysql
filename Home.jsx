import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Import the CSS file

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      {
        auth ? (
          <div>
            <h3>You are authorized ... {name}</h3>
            <button onClick={handleDelete}>Logout</button>
          </div>
        ) : (
          <div>
            <h3>{message}</h3>
            <div className="links-container">
              <Link to="/login" className="link-button">Login</Link>
              <Link to="/register" className="link-button">Register</Link>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Home;
