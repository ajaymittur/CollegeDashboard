const firebase = require("firebase");
const admin = require("firebase-admin");
const processData = require("./utils");

const firebaseConfig = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	databaseURL: process.env.databaseURL,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
	appId: process.env.appId,
	measurementId: process.env.measurementId
};

firebase.initializeApp(firebaseConfig);

const fireDB = firebase.firestore();
const fireAuth = firebase.auth();

const actionCodeSettings = {
	url: "https://collegedashboard.netlify.com" // redirect url
};

async function signup(accountDetails) {
	let { email, usn, name, password, profilepic } = accountDetails;
	usn = usn.toUpperCase();
	let usnExists = false;

	try {
		let querySnapshot = await fireDB
			.collection("accounts")
			.where("usn", "==", usn)
			.get();

		querySnapshot.forEach(doc => {
			if (doc.exists) {
				usnExists = true;
			}
		});
	} catch (error) {
		return { isSuccess: false, message: error.message };
	}

	if (!usnExists) {
		try {
			let userRecord = await fireAuth.createUserWithEmailAndPassword(email, password);
			userRecord.user.updateProfile({
				displayName: name,
				photoURL: profilepic
			});

			fireDB
				.collection("accounts")
				.doc(usn)
				.set({
					createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
					email,
					password,
					name,
					usn,
					profilepic,
					userId: userRecord.user.uid
				});

			let processedUserData = processData(accountDetails);

			fireDB
				.collection("student")
				.doc(usn)
				.set({
					...processedUserData,
					notes: []
				});

			return {
				isSuccess: true,
				message: `Successfully created new user: ${userRecord.user.uid}`
			};
		} catch (error) {
			return { isSuccess: false, message: error.message };
		}
	} else return { isSuccess: false, message: "User with provided USN already exists" };
}

async function login(accountDetails) {
	const { email, password } = accountDetails;

	try {
		let userRecord = await fireAuth.signInWithEmailAndPassword(email, password);
		return {
			isSuccess: true,
			message: `Successfully logged in user: ${userRecord.user.uid}`
		};
	} catch (error) {
		return { isSuccess: false, message: "Invalid login credentials" };
	}
}

async function resetPass(email) {
	try {
		await fireAuth.sendPasswordResetEmail(email, actionCodeSettings);
		return {
			isSuccess: true,
			message: `Password Reset mail has been sent to ${email}`
		};
	} catch (error) {
		return {
			isSuccess: false,
			message: "Couldn't find the provided email address in our records."
		};
	}
}

async function getCurrentUser() {
	let user = fireAuth.currentUser;
	let response = {};
	if (user) {
		let querySnapshot = await fireDB
			.collection("student")
			.where("email", "==", user.email)
			.get();

		querySnapshot.forEach(doc => {
			if (doc.exists) {
				response = {
					isSuccess: true,
					userData: { ...doc.data(), profilepic: user.photoURL },
					message: "User data retrieved"
				};
			} else {
				response = { isSuccess: false, message: "User Data not found" };
			}
		});

		return response;
	} else {
		return { isSuccess: false, message: "User Not Logged In" };
	}
}

async function logout() {
	try {
		await fireAuth.signOut();
		return { isSuccess: true, message: "User logged out successfully" };
	} catch (error) {
		return {
			isSuccess: false,
			message: "Error occurred while logging user out"
		};
	}
}

async function addNotes(files, usn) {
	let batch = fireDB.batch();
	let response = { isSuccess: true, message: "Files uploaded successfully" };
	const fileURLS = files.map(file => file.location);

	let querySnapshot = await fireDB
		.collection("student")
		.orderBy("usn")
		.startAt(usn.slice(0, 7))
		.endAt(usn.slice(0, 7) + "\uf8ff")
		.get();

	querySnapshot.forEach(doc => {
		if (!doc.exists) response = { isSuccess: false, message: "Files upload failed" };
		const docRef = fireDB.collection("student").doc(doc.id);
		const notesLinks = doc.data().notes;
		batch.update(docRef, { notes: [...fileURLS, ...notesLinks] });
	});

	await batch.commit();

	return response;
}

async function getNotes() {
	let user = fireAuth.currentUser;
	let response = {};
	if (user) {
		let querySnapshot = await fireDB
			.collection("student")
			.where("email", "==", user.email)
			.get();

		querySnapshot.forEach(doc => {
			if (doc.exists) {
				response = {
					isSuccess: true,
					notes: doc.data().notes,
					message: "Notes retrieved"
				};
			} else {
				response = { isSuccess: false, message: "Notes not found" };
			}
		});

		return response;
	} else {
		return { isSuccess: false, message: "User Not Logged In" };
	}
}

module.exports = {
	signup,
	login,
	resetPass,
	getCurrentUser,
	logout,
	addNotes,
	getNotes
};
