import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique IDs

export const weightSlice = createSlice({
    name: 'weight',
    initialState: {
        weights: [
            {
                id: uuidv4(),
                date: "2024-10-11T04:49:53.719454Z",
                weight: 33
            },
            {
                id: uuidv4(),
                date: "2024-10-15T04:49:53.719477Z",
                weight: 76
            },
            {
                id: uuidv4(),
                date: "2024-10-14T04:49:53.719486Z",
                weight: 76
            },
            {
                id: uuidv4(),
                date: "2024-10-13T04:49:53.719493Z",
                weight: 64
            },
            {
                id: uuidv4(),
                date: "2024-10-12T04:49:53.719501Z",
                weight: 68
            }
        ],  // List of weights with unique IDs
        error: null,  // Error message for invalid operations
    },
    reducers: {
        addWeight: (state, action) => {
            const { weight } = action.payload;
            const today = moment().startOf('day');
            const existingWeight = state.weights.find(w => moment(w.date).isSame(today, 'day'));

            // Restriction: Limit to 5 weights
            if (state.weights.length >= 5) {
                state.error = 'Cannot add more than 5 weights.';
                return;
            }

            if (existingWeight) {
                state.error = 'Weight already added for today';
            } else {
                state.weights.push({
                    id: uuidv4(), // Add unique ID here
                    weight: weight,
                    date: moment().toISOString()  // Store current time as date
                });
                state.error = null;
            }
        },
        editWeight: (state, action) => {
            const { id, newWeight } = action.payload;
            const weightEntry = state.weights.find(w => w.id === id);
            if (weightEntry) {
                weightEntry.weight = newWeight;
            }
        },
        deleteWeight: (state, action) => {
            const { id } = action.payload;
            state.weights = state.weights.filter(w => w.id !== id);
        },
        calculateWeightLoss: (state, action) => {
            const { startDate, endDate } = action.payload;
            const startWeight = state.weights.find(w => moment(w.date).isSame(startDate, 'day'));
            const endWeight = state.weights.find(w => moment(w.date).isSame(endDate, 'day'));

            if (startWeight && endWeight) {
                const weightLoss = startWeight.weight - endWeight.weight;
                state.error = `Weight loss between ${moment(startDate).format('YYYY-MM-DD')} and ${moment(endDate).format('YYYY-MM-DD')} is ${weightLoss} kg.`;
            } else {
                state.error = 'Invalid date range or no weights found for the selected dates.';
            }
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const { addWeight, editWeight, deleteWeight, calculateWeightLoss, clearError } = weightSlice.actions;

export default weightSlice.reducer;