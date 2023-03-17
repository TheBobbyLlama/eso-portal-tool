import { get, ref, set } from "firebase/database";

import db from ".";
import { dbTransform } from "../util";

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

function setTownData(data) {
	return new Promise((res, rej) => {
		const dataRef = ref(db, `development/${dbTransform(data.name)}`);

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