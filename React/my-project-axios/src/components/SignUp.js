import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:5000/api/signup', { email, password, confirmPassword })
            console.log(result)
            setError([])
            setMessage('Form submitted successfully');
            navigate('/login')
        } catch (error) {
            if (error.response?.data?.errors) {
                const errorMessages = Object.values(error.response.data.errors).map((err) => err.message || err.msg);
                setError(errorMessages.map((msg) => ({ msg })));
            } else {
                setError([{ msg: error.response?.data?.message || error.message }]);
            }
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">Signup</h1>

            {/* Error Message */}
            {message && (
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            )}

            {/* Validation Errors */}
            {error.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {error.map((err, index) => (
                        <p key={index}>{err.msg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="container">
                <div className="form-group">
                    <label htmlFor="email" className="font-weight-bold">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="form-control"
                        value={email}

                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="font-weight-bold">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword" className="font-weight-bold">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="text-center">Already have an account? <Link to={'/login'}>Login</Link></p>
            </form>
        </div>
    );
};

export default Signup;
