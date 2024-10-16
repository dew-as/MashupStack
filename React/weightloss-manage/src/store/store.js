import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/actions/authActions'
import weightSlice from "./actions/weightActions";

var store = configureStore({
    reducer: {
        auth: authReducer,
        weight: weightSlice
    }
})

export default store