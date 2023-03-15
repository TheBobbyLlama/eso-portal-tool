import { get, ref, set } from "firebase/database";

import db from ".";
import { dbTransform } from "../util";

// Metadata is independent of app state, so pull it down immediately.
(() => {
	window.metadata = localStorage.getItem("metadata"); // Safeguard against race conditions for autologin.

	const discordRef = ref(db, "metadata");

	get(discordRef).then((result) => {
		if (result.exists()) {
			window.metadata = result.val();
			localStorage.setItem("metadata", window.metadata);
		}
	});
})();

function loadProductionData() {
	return new Promise((res, rej) => {
		const dataRef = ref(db, "production");

		get(dataRef).then(async (result) => {
			if (result.exists()) {
				res(result.val());
			} else {
				res({ });
			}
		}).catch(rej);
	})
}

function loadTownData(townName) {
	return new Promise((res, rej) => {
		const dataRef = ref(db, `development/${dbTransform(townName)}`);

		get(dataRef).then(async (result) => {
			if (result.exists()) {
				res(result.val());
			} else {
				res({ });
			}
		}).catch(rej);
	})
}

function setProductionData(data) {
	return new Promise((res, rej) => {
	const dataRef = ref(db, "production");

	data.timestamp = Date.now();

	set(dataRef, data).then(res).catch(rej);
});
}

function setTownData(townName, data) {
	return new Promise((res, rej) => {
		const dataRef = ref(db, `development/${dbTransform(townName)}`);

		data.timestamp = Date.now();

		set(dataRef, data).then(res).catch(rej);
	});
}

const townFuncs = {
	loadProductionData,
	loadTownData,
	setProductionData,
	setTownData,
};

export default townFuncs;