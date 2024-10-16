import React from 'react';
import Header from '../auth/Header';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container mt-5 text-center">
        <h1 className="display-4">Welcome to Weight Loss Management Site</h1>
        <p className="lead">
          Track your progress and stay motivated to reach your weight loss goals!
        </p>
        <Link to={"/weightList"} className="btn btn-primary mt-4">Get Started</Link>
      </div>
    </div>
  );
};

export default Home;