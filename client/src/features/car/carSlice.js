import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
    cars:[],
}

const carSlice = createSlice({
    name: "car",
    initialState: defaultState,
    reducers: {
        setRecommendations: (state, action) => {
            state.cars = action.payload; // Set the list of car recommendations
        },
        clearRecommendations: (state) => {
            state.cars = []; // Clear the recommendations (if needed)
        },
    }
})

export const { setRecommendations, clearRecommendations } = carSlice.actions;
export default carSlice.reducer;