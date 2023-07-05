import { createSlice } from '@reduxjs/toolkit';
import { User } from '../UserCard/UserCardTypes';

export interface UserState {
    users: User[] | null;
}

const initialState: UserState = {
    users: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = [...action.payload];
        },
        updateUser: (state, action) => {
            if (state.users) {
                const userIndex = state.users.findIndex(user => {
                return user._id === action.payload._id
                });
                state.users[userIndex] = action.payload;
            }
        },
        addUser: (state, action) => {
            state.users?.push(action.payload);
        },
        deleteUser: (state, action) => {
            state.users = state.users?.filter(user => {
                return user._id !== action.payload._id
            });
        }
    }
});

export const { setUsers, updateUser, addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;