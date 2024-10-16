import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../store/actions/authActions'; // Import the login and clearError actions
import { Link, useNavigate, useParams } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate()
  const params = useParams()
  console.log(params.msg);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(clearError()); // Clear previous errors before submitting
    dispatch(loginUser({ email, password })); // Dispatch login action with user credentials
  };

  useEffect(() => {
    // If the user is authenticated, navigate to the home page
    if (isAuthenticated) {
      navigate('/'); // Redirect to home page
    }
  }, [isAuthenticated, navigate]); // Run this effect whenever isAuthenticated changes

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>

              {/* Show an error message if there are any errors */}
              {error && <div className="alert alert-danger">{error}</div>}
              {!error && params.msg && <div className="alert alert-danger">{params.msg}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              <div className='text-center d-block' >
                <Link className='d-block' to={'/register'}>Register</Link>
                <Link className='d-block' to={'/'}>Go Home -&gt;</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;