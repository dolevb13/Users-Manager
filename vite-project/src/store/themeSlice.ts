import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        light: true
    },
    reducers: {
        changeTheme: state => {
            state.light = !state.light;
        }
    }
});

export const {changeTheme} = themeSlice.actions;

export default themeSlice.reducer;