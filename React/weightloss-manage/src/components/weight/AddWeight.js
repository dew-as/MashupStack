import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWeight } from '../../store/actions/weightActions'; // Import the action

const AddWeight = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addWeight({ weight: Number(value) })); // Dispatching the action
    setValue(''); // Clear input after submission
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Add Your Weight</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="weight" className="form-label">Weight (kg)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="weight"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter your weight"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Weight</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWeight;