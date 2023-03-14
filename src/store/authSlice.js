import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		// loading: true, // Used on startup.
	},
	reducers: {
		// TODO
	}
});

export const { } = authSlice.actions;

export const authSelectors = {
	error: (state) => {
		return state.auth.error;
	},
	loading: (state) => {
		return state.auth.loading;
	},
	user: (state) => {
		return state.auth.user;
	}
}

export default authSlice.reducer;