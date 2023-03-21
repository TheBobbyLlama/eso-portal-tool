import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const scramble = "AK-C2EczMqOAM8SmsdsEpA6IVBY00Za8qm59qyq";

function buildKey() {
	var result = "";

	for (var i = 0; i < scramble.length; i++) {
		result += scramble[(23 * i) % scramble.length];
	}

	return result;
}

const firebaseConfig = {
	apiKey: buildKey(),
	authDomain: "rp-town-portal.firebaseapp.com",
	databaseURL: "https://rp-town-portal-default-rtdb.firebaseio.com",
	projectId: "rp-town-portal",
	storageBucket: "rp-town-portal.appspot.com",
	messagingSenderId: "663368057720",
	appId: "1:663368057720:web:abf29d3277a9c7bf58be8d"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export const auth = getAuth(app);

export default database;