import { configureStore } from '@reduxjs/toolkit';
import All from './all';

export const store = configureStore({
    reducer: {
        lessons: All
    }
});
