import { createSlice } from "@reduxjs/toolkit";
import { listener } from "./listener";
import townFuncs from "../db/town";

export const townSlice = createSlice({
	name: "town",
	initialState: {
		busy: false,
		changed: false,
	},
	reducers: {
		loadProductionData(state) { 
			state.production = undefined;
		},
		loadProductionDataSuccess(state, action) {
			state.production = action.payload;
		},
		loadTownData(state) {
			state.backup = undefined;
			state.working = undefined;
			state.changed = false;
		},
		loadTownDataSuccess(state, action) {
			state.backup = action.payload;
			state.working = JSON.parse(JSON.stringify(state.backup)); // Deep copy.
		},
		resetWorkingData(state) {
			state.working = JSON.parse(JSON.stringify(state.backup)); // Deep copy.
			state.changed = false;
		},
		saveProductionData(state) {
			state.busy = true;
		},
		saveTownData(state) {
			state.busy= true;
			state.changed = false;
		},
		saveTownDataSuccess(state) {
			state.busy = false;
			state.backup = JSON.parse(JSON.stringify(state.working)); // Deep copy.
		},
		setBusy(state, action) {
			state.busy = action.payload;
		}
	}
});

export const townActions = townSlice.actions;

export const townSelectors = {
	busy: (state) => {
		return state.town.busy;
	},
	changed: (state) => {
		return state.town.changed;
	},
	production: (state) => {
		return state.town.production;
	},
	working: (state) => {
		return state.town.working;
	}
}

listener.startListening({
	actionCreator: townActions.loadProductionData,
	effect: async (action, listenerApi) => {
		townFuncs.loadProductionData().then((result) => {
			if (result) {
				listenerApi.dispatch(townActions.loadProductionDataSuccess(result));
			}
		});
	}
});

listener.startListening({
	actionCreator: townActions.loadTownData,
	effect: async (action, listenerApi) => {
		if (action.payload) {
			townFuncs.loadTownData(action.payload).then((result) => {
				if (result) {
					listenerApi.dispatch(townActions.loadTownDataSuccess(result));
				}
			});
		}
	}
});

listener.startListening({
	actionCreator: townActions.saveProductionData,
	effect: async (action, listenerApi) => {
		townFuncs.saveProductionData(listenerApi.getState().town.production).then(() => {
			listenerApi.dispatch(townActions.setBusy(false));
		});
	}
});

listener.startListening({
	actionCreator: townActions.saveTownData,
	effect: async (action, listenerApi) => {
		townFuncs.saveTownData(listenerApi.getState().town.working).then(() => {
			listenerApi.dispatch(townActions.saveTownDataSuccess());
		});
	}
});

export default townSlice.reducer;