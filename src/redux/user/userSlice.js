// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    user: null
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        signOutUser(state, action) {
            state.user = null;
        }
    },
});
export const { setUser, signOutUser } = userSlice.actions;
export default userSlice.reducer;

