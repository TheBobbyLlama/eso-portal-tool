import { createSlice } from "@reduxjs/toolkit";
import { listener } from "./listener";
import townFuncs from "../db/town";
import { modalActions, modalKey } from "./modalSlice";

const baseTown = {
	locations: [],
};

const baseLocation = {
	name: "Unnamed Location",
	houseId: "1",
	owner: "",
	portals: [],
};

const basePortal = {
	destinations: [],
	x: 0,
	y: 0,
	z: 0,
	mapX: 0,
	mapY: 0,
}

// Firbase's Realtime Database does not store empty arrays or null values.  Make sure loaded data has the required structure.
function setTownData(data) {
	const result = { ...baseTown, ...data };

	result.locations = [ ...result.locations ];

	for (let loc = 0; loc < result.locations.length; loc++) {
		result.locations[loc] = { ...baseLocation, ...result.locations[loc] };

		for (let port = 0; port < result.locations[loc].portals.length; port++) {
			result.locations[loc].portals[port] = { ...basePortal, ...result.locations[loc].portals[port] };
		}
	}

	return result;
}

export const townSlice = createSlice({
	name: "town",
	initialState: {
		busy: false,
		changed: false,
		filter: [],
	},
	reducers: {
		// Database operations
		loadReleaseData(state) { 
			state.release = undefined;
		},
		loadReleaseDataSuccess(state, action) {
			state.release = setTownData(action.payload);
		},
		loadTownData(state) {
			state.backup = undefined;
			state.working = undefined;
			state.changed = false;
		},
		loadTownDataSuccess(state, action) {
			state.backup = setTownData(action.payload);
			state.working = JSON.parse(JSON.stringify(state.backup)); // Deep copy.
		},
		saveReleaseData(state) {
			state.busy = true;
		},
		saveTownData(state) {
			state.working = { ...state.working, modified: Date.now() };
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

			state.changed = true;
		},
		deleteLocation(state, action) {
			state.working = { ...state.working };
			state.working.locations = state.working.locations.filter(item => item.id !== action.payload.locationId);

			// TODO - Remove portal destinations that point to the deleted location!

			state.changed = true;
		},
		setLocationFilter(state, action) {
			state.filter = action.payload;
		},
		setLocationData(state, action) {
			const editLoc = state.working.locations.findIndex(item => item.id === action.payload.locationId);

			if (editLoc > -1) {
				state.working = { ...state.working };
				state.working.locations = [...state.working.locations];
				state.working.locations[editLoc] = {...state.working.locations[editLoc], ...action.payload.data};

				state.changed = true;
			}
		},
		addPortal(state, action) {
			const editLoc = state.working.locations.findIndex(item => item.id === action.payload.locationId);

			if (editLoc > -1) {
				state.working = { ...state.working };
				state.working.locations = [...state.working.locations];
				state.working.locations[editLoc] = { ...state.working.locations[editLoc] };
				state.working.locations[editLoc].portals = [...state.working.locations[editLoc].portals, { ...basePortal, id: Date.now() }];

				state.changed = true;
			}
		},
		deletePortal(state, action) {
			const editLoc = state.working.locations.findIndex(item => item.id === action.payload.locationId);

			if (editLoc > -1) {
				state.working = { ...state.working };
				state.working.locations = [...state.working.locations];
				state.working.locations[editLoc] = { ...state.working.locations[editLoc] };
				state.working.locations[editLoc].portals = state.working.locations[editLoc].portals.filter(item => item.id !== action.payload.portalId);

				state.changed = true;
			}
		},
		setPortalData(state, action) {
			const editLoc = state.working.locations.findIndex(item => item.id === action.payload.locationId);

			if (editLoc > -1) {
				const editPortal = state.working.locations[editLoc].portals.findIndex(item => item.id === action.payload.portalId);

				if (editPortal > -1) {
					state.working = { ...state.working };
					state.working.locations = [...state.working.locations];
					state.working.locations[editLoc] = { ...state.working.locations[editLoc] };
					state.working.locations[editLoc].portals = [...state.working.locations[editLoc].portals];
					state.working.locations[editLoc].portals[editPortal] = { ...state.working.locations[editLoc].portals[editPortal], ...action.payload.data };

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
	filter: (state) => {
		return state.town.filter;
	},
	release: (state) => {
		return state.town.release;
	},
	working: (state) => {
		return state.town.working;
	}
}

listener.startListening({
	actionCreator: townActions.loadReleaseData,
	effect: async (action, listenerApi) => {
		townFuncs.loadReleaseData().then((result) => {
			if (result) {
				listenerApi.dispatch(townActions.loadReleaseDataSuccess(result));
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
	actionCreator: townActions.saveReleaseData,
	effect: async (action, listenerApi) => {
		townFuncs.saveReleaseData(listenerApi.getState().town.release).then(() => {
			listenerApi.dispatch(townActions.setBusy(false));
			listenerApi.dispatch(modalActions.showModal({
				key: modalKey.generic,
				data: {
					title: "Success",
					text: "Data saved to release branch."
				}
			}));
		});
	}
});

listener.startListening({
	actionCreator: townActions.saveTownData,
	effect: async (action, listenerApi) => {
		const workingData = listenerApi.getState().town.working;

		townFuncs.saveTownData(workingData).then(() => {
			listenerApi.dispatch(townActions.saveTownDataSuccess());
			listenerApi.dispatch(modalActions.showModal({
				key: modalKey.generic,
				data: {
					title: "Success",
					text: `Data for ${workingData.name} has been saved.`
				}
			}));
		});
	}
});

export default townSlice.reducer;