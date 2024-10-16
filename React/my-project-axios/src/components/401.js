import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className="unauthorized-container">
            <h1>401 Unauthorized</h1>
            <p>You do not have permission to access this page.</p>
            <Link className='btn btn-primary' to={'/'}>Go home</Link>
        </div>
    );
};

export default Unauthorized;