import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./reducers/filterReducer";
import noteReducer from './reducers/noteReducers';

const store = configureStore({
    reducer:{
        notes: noteReducer,
        filter: filterReducer
    }
})

export default store