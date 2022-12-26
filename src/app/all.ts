import { createSlice } from '@reduxjs/toolkit';
import { getLessons } from '../utils/helper';

const initialState = {
    allLessons: getLessons()
};

export const All = createSlice({
    name: 'lessons',
    initialState,
    reducers: {
        updateLessons: (state, action) => {
            state.allLessons = action.payload;
        }
    }
});

// export const { changeLoading } = All.actions;

export default All.reducer;
