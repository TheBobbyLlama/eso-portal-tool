import { createSlice } from "@reduxjs/toolkit";
import { listener } from "./listener";
import townFuncs from "../db/town";

const baseTown = {
	locations: [],
};

const baseLocation = {
	name: "New Location",
	portals: [],
};

const basePortal = {
	destinations: [],
	x: 0,
	y: 0,
	z: 0,
	cx: 0,
	cy: 0,
}

export const townSlice = createSlice({
	name: "town",
	initialState: {
		busy: false,
		changed: false,
	},
	reducers: {
		// Database operations
		loadProductionData(state) { 
			state.production = undefined;
		},
		loadProductionDataSuccess(state, action) {
			state.production = { ...baseTown, ...action.payload };
		},
		loadTownData(state) {
			state.backup = undefined;
			state.working = undefined;
			state.changed = false;
		},
		loadTownDataSuccess(state, action) {
			state.backup = { ...baseTown, ...action.payload };
			state.working = JSON.parse(JSON.stringify(state.backup)); // Deep copy.
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
		},
		// Data editing
		resetWorkingData(state) {
			state.working = JSON.parse(JSON.stringify(state.backup)); // Deep copy.
			state.changed = false;
		},
		addLocation(state) {
			state.working = { ...state.working };
			state.working.locations = [...state.working.locations, { ...baseLocation, id: Date.now() }];

			if (state.working.locations.length === 1) {
				state.working.locations[0].startLocation = 0;
			}

			state.changed = true;
		},
		deleteLocation(state, action) {
			state.working = { ...state.working };
			state.working.locations = state.working.locations.filter(item => item.id !== action.payload.locationId);

			state.changed = true;
		},
		setStartLocation(state, action) {
			const setLoc = state.working.locations.findIndex(item => item.id === action.payload.locationId);

			if (setLoc > -1) {
				const oldStart = state.working.locations.findIndex(item => item.startLocation);

				state.working = { ...state.working };
				state.working.locations = [...state.working.locations];
				state.working.locations[setLoc] = { ...state.working.locations[setLoc], startLocation: true };

				if (oldStart) {
					state.working.locations[oldStart] = { ...state.working.location[oldStart] };
					delete state.working.locations[oldStart].startLocation;
				}

				state.changed = true;
			}
		},
		setLocationData(state, action) {
			const editLoc = state.working.locations.findIndex(item => item.id === action.payload.locationId);

			if (editLoc > -1) {
				state.working = { ...state.working };
				state.working.locations = [...state.working.locations];
				state.working.locations[editLoc] = {...state.working.locations, ...action.payload.data};

				state.changed = true;
			}
		},
		addPortal(state, action) {
			const editLoc = state.working.locations.findIndex(item => item.id === action.payload.locationId);

			if (editLoc > -1) {
				state.working = { ...state.working };
				state.locations = [...state.working.locations];
				state.locations[editLoc] = { ...state.locations[editLoc] };
				state.locations[editLoc].portals = [...state.locations[editLoc].portals, { ...basePortal, id: Date.now() }];

				state.changed = true;
			}
		},
		deletePortal(state, action) {
			const editLoc = state.working.locations.findIndex(item => item.id === action.payload.locationId);

			if (editLoc > -1) {
				state.working = { ...state.working };
				state.locations = [...state.working.locations];
				state.locations[editLoc] = { ...state.locations[editLoc] };
				state.locations[editLoc].portals = state.locations[editLoc].portals.filter(item => item.id !== action.payload.portalId);

				state.changed = true;
			}
		},
		setPortalData(state, action) {
			const editLoc = state.working.locations.findIndex(item => item.id === action.payload.locationId);

			if (editLoc > -1) {
				const editPortal = state.locations[editLoc].portals.findIndex(item => item.id === action.payload.portalId);

				if (editPortal > -1) {
					state.working = { ...state.working };
					state.locations = [...state.working.locations];
					state.locations[editLoc] = { ...state.locations[editLoc] };
					state.locations[editLoc].portals = [...state.locations[editLoc].portals];
					state.locations[editLoc].portals[editPortal] = { ...state.locations[editLoc].portals[editPortal], ...action.payload.data };

					state.changed = true;
				}
			}
		},
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