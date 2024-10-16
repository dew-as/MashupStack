import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

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
                weight: 42
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
            },
            {
                id: uuidv4(),
                date: "2024-10-10T04:49:53.719400Z",
                weight: 58
            },
            {
                id: uuidv4(),
                date: "2024-10-09T04:49:53.719410Z",
                weight: 71
            },
            {
                id: uuidv4(),
                date: "2024-10-08T04:49:53.719420Z",
                weight: 47
            },
            {
                id: uuidv4(),
                date: "2024-10-07T04:49:53.719430Z",
                weight: 55
            },
            {
                id: uuidv4(),
                date: "2024-10-06T04:49:53.719440Z",
                weight: 62
            }
        ],
        error: null,
    },
    reducers: {
        addWeight: (state, action) => {
            const { weight } = action.payload;
            const today = moment().startOf('day');
            const existingWeight = state.weights.find(w => moment(w.date).isSame(today, 'day'));

            if (existingWeight) {
                state.error = 'Weight already added for today';
            } else {
                state.weights.push({
                    id: uuidv4(),
                    weight: weight,
                    date: moment().toISOString()
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
                const weightDifference = endWeight.weight - startWeight.weight;

                if (weightDifference < 0) {
                    const weightLoss = Math.abs(weightDifference);
                    state.error = `Weight loss between ${moment(startDate).format('YYYY-MM-DD')} and ${moment(endDate).format('YYYY-MM-DD')} is ${weightLoss} kg.`;
                } else if (weightDifference > 0) {
                    const weightGain = weightDifference;
                    state.error = `Weight gain between ${moment(startDate).format('YYYY-MM-DD')} and ${moment(endDate).format('YYYY-MM-DD')} is ${weightGain} kg.`;
                } else {
                    state.error = 'No change in weight between the selected dates.';
                }
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
