const firebase = require("firebase");
const processData = require("./utils");

const firebaseConfig = {
	apiKey: "AIzaSyDyqfxEVA6uXKgaVM326-VwMvvwYeqvvMQ",
	authDomain: "college-dashboard-3rd-sem.firebaseapp.com",
	databaseURL: "https://college-dashboard-3rd-sem.firebaseio.com",
	projectId: "college-dashboard-3rd-sem",
	storageBucket: "college-dashboard-3rd-sem.appspot.com",
	messagingSenderId: "1010034751049",
	appId: "1:1010034751049:web:a4e4a3cebb5197ba5fb198",
	measurementId: "G-L3LSHQBQ2Q"
};

firebase.initializeApp(firebaseConfig);

const fireDB = firebase.firestore();
const fireAuth = firebase.auth();

const actionCodeSettings = {
	url: "https://collegedashboard.netlify.com" // redirect url
};

async function signup(accountDetails) {
	const { email, usn, name, password } = accountDetails;

	try {
		let userRecord = await fireAuth.createUserWithEmailAndPassword(email, password);
		userRecord.user.updateProfile({
			displayName: name
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
				userId: userRecord.user.uid
			});

		let processedUserData = processData(accountDetails);

		fireDB
			.collection("students")
			.doc(usn)
			.set({
				...processedUserData
			});

		return {
			isSuccess: true,
			message: `Successfully created new user: ${userRecord.user.uid}`
		};
	} catch (error) {
		return { isSuccess: false, message: error.message };
	}
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
		return { isSuccess: false, message: error.message };
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
		let docSnapshot = await fireDB
			.collection("student")
			.where("email", "==", user.email)
			.get();
		docSnapshot.forEach(doc => {
			if (doc.exists) {
				response = {
					isSuccess: true,
					userData: doc.data(),
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

module.exports = {
	signup,
	login,
	resetPass,
	getCurrentUser,
	logout
};
