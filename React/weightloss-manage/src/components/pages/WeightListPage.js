import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import WeightList from '../weight/WeightList';
import AddWeight from '../weight/AddWeight';
import WeightLossCalculator from '../weight/WeightLossCalculator';
import Header from '../auth/Header';
import checkAuth from '../auth/checkAuth';

const WeightListPage = () => {
    // Access the error from Redux state
    const error = useSelector((state) => state.weight.error);

    return (
        <div className='container-fluid'>
            <Header />
            {/* Display error message if there's an error */}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <WeightList />
            <div className='d-flex align-items-center justify-content-around'>
                <WeightLossCalculator />
                <AddWeight />
            </div>
        </div>
    );
};

export default checkAuth(WeightListPage);
