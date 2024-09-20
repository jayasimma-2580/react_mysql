import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './auth.css';  // Ensure you link the external CSS file

function Register() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/register', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/login');
                } else {
                    alert("Error");
                }
            }).catch(err => console.log(err));
    };

    return (
        <div className="container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter Your Name" 
                        name="name" 
                        onChange={e => setValues({ ...values, name: e.target.value })} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input 
                        type="email" 
                        placeholder="Enter Your E-mail" 
                        name="email" 
                        onChange={e => setValues({ ...values, email: e.target.value })} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter Your Password" 
                        name="password" 
                        onChange={e => setValues({ ...values, password: e.target.value })} 
                    />
                </div>

                <button type="submit">Register</button>

                <Link to="/login">Already have an account? Login</Link>
            </form>
        </div>
    );
}

export default Register;
