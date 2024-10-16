import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { calculateWeightLoss } from '../../store/actions/weightActions'; // Import the action

const WeightLossCalculator = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const dispatch = useDispatch();

    const handleCalculate = () => {
        dispatch(calculateWeightLoss({ startDate, endDate })); // Dispatch action with selected dates
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Weight Loss Calculator</h3>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="startDate" className="form-label">Start Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="startDate"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="endDate" className="form-label">End Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="endDate"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={handleCalculate}
                                >
                                    Calculate Weight Loss
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeightLossCalculator;
