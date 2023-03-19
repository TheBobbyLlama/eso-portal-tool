import { get, ref, set } from "firebase/database";

import db from ".";
import { dbTransform } from "../util";

function loadReleaseData() {
	return new Promise((res, rej) => {
		const dataRef = ref(db, "release");

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
				res({ name: townName });
			}
		}).catch(rej);
	})
}

function setReleaseData(data) {
	return new Promise((res, rej) => {
	const dataRef = ref(db, "release");

	data.timestamp = Date.now();

	set(dataRef, data).then(res).catch(rej);
});
}

function saveTownData(data) {
	return new Promise((res, rej) => {
		const dataRef = ref(db, `development/${dbTransform(data.name)}`);

		set(dataRef, data).then(res).catch(rej);
	});
}

const townFuncs = {
	loadReleaseData,
	loadTownData,
	setReleaseData,
	saveTownData,
};

export default townFuncs;