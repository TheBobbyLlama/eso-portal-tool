import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { get, ref } from "firebase/database";

import db, { auth } from ".";

function loadUserData(uid) {
	return new Promise((res, rej) => {
		const userRef = ref(db, `users/${uid}`);

		get(userRef).then((result) => {
			if (result.exists()) {
				const output = { ...result.val(), uid };
				res(output);
			} else {
				rej("No user data found.");
			}
		}).catch(rej);
	})
}

function autoLogin() {
	if (auth.currentUser) {
		return loadUserData(auth.currentUser.uid);
	} else {
		return new Promise((res) => { res(false); });
	}
}

function login(userData) {
	return new Promise((res, rej) => {
		try {
			signInWithEmailAndPassword(auth, userData.email, userData.password).then((result) => {
				const { uid } = result.user;

				return loadUserData(uid);
			}).then(res).catch(rej);
		} catch (e) {
			rej(e);
		}
	});
}

function logout() {
	return new Promise((res) => {
		signOut(auth).then(res);
	});
}

const authFuncs = {
	autoLogin,
	login,
	logout,
};

export default authFuncs;