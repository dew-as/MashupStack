import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editWeight, deleteWeight } from '../../store/actions/weightActions'; // Import actions
import moment from 'moment';

const WeightItem = ({ weight }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState(weight.weight); // Update to weight.weight

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        dispatch(editWeight({ id: weight.id, newWeight: Number(newValue) })); // Dispatch edit action
        setIsEditing(false);
    };

    const handleDelete = () => {
        dispatch(deleteWeight({ id: weight.id })); // Dispatch delete action
    };

    return (
        <tr>
            <td>{moment(weight.date).format('YYYY-MM-DD h:mm:ss A')}</td>
            <td>
                {isEditing ? (
                    <input
                        type="number"
                        className="form-control"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                    />
                ) : (
                    <span>{weight.weight} kg</span> // Display weight
                )}
            </td>
            <td>
                {isEditing ? (
                    <>
                        <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
                        <button className="btn btn-danger ml-3" onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-primary me-2" onClick={handleEdit}>Edit</button>
                        <button className="btn btn-danger ml-3" onClick={handleDelete}>Delete</button>
                    </>
                )}
            </td>
        </tr>
    );
};

export default WeightItem;