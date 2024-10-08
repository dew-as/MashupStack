import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Example validation (you can replace this with actual API call)
        if (!email || !password) {
            setErrors([{ msg: 'Email and password are required' }]);
            return;
        }

        // Reset errors after submission
        setErrors([]);
        setMessage('Form submitted successfully');

        // API call logic can be added here (e.g., fetch or axios for POST request)
        console.log({ email, password });
        navigate('/')
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