import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Login = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (params.msg) {
            setErrors([{ msg: params.msg }]);
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!email || !password) {
                setErrors([{ msg: 'Email and password are required' }])
                return;
            }
            const userLogin = await axios.post('http://localhost:5000/api/login', { email, password })
            setErrors([])
            setMessage('Form submitted successfully')
            console.log(userLogin.data.token)
            localStorage.setItem('token', userLogin.data.token)
            localStorage.setItem('email', userLogin.data.email)
            axios.defaults.headers.common['Authorization'] = `Bearer ${userLogin.data.token}`
            navigate('/')
        } catch (error) {
            // setErrors([{ msg: error.response.data.message || error.response.data.errors[0].msg }]);
            console.log(error)
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="text-center">Don't have an account? <Link to={'/signup'}>Signup</Link></p>
            </form>

            {/* Message Handling */}
            {message && (
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            )}

            {/* Error Handling */}
            {errors.length > 0 && (
                <div style={{ color: 'red' }}>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error.msg}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Login;