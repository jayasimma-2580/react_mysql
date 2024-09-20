import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './auth.css';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/');
                } else {
                    alert(res.data.Error);
                }
            }).catch(err => console.log(err));
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" placeholder="Enter Your E-mail" name="email" onChange={e => setValues({...values, email: e.target.value})} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Your Password" name="password" onChange={e => setValues({...values, password: e.target.value})} />
                </div>

                <button type="submit">Login</button>
                <Link to="/register">Register</Link>
            </form>
        </div>
    );
}

export default Login;
