import { createSlice } from "@reduxjs/toolkit";

export const modalKey = {
	clear: null,
	generic: 1,
	houseStyle:2,
}

export const modalSlice = createSlice({
	name: "modal",
	initialState: {
		key: null,
	},
	reducers: {
		showModal(state, action) {
			Object.entries(action.payload).forEach(([key, value]) => { state[key] = value; });
		}
	}
});

export const modalActions = modalSlice.actions;

export const modalSelectors = {
	key: (state) => {
		return state.modal.key;
	},
	data: (state) => {
		return state.modal.data;
	},
}

export default modalSlice.reducer;