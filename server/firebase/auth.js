const firebase = require("firebase")

const firebaseConfig = {
	apiKey: "AIzaSyDyqfxEVA6uXKgaVM326-VwMvvwYeqvvMQ",
	authDomain: "college-dashboard-3rd-sem.firebaseapp.com",
	databaseURL: "https://college-dashboard-3rd-sem.firebaseio.com",
	projectId: "college-dashboard-3rd-sem",
	storageBucket: "college-dashboard-3rd-sem.appspot.com",
	messagingSenderId: "1010034751049",
	appId: "1:1010034751049:web:a4e4a3cebb5197ba5fb198",
	measurementId: "G-L3LSHQBQ2Q"
}

firebase.initializeApp(firebaseConfig)

const fbdb = firebase.firestore()
const fbauth = firebase.auth()

async function signup(accountDetails) {
	const { email, usn, name, password } = accountDetails

	try {
		let userRecord = await fbauth.createUserWithEmailAndPassword(email, password)

		fbdb
			.collection("students")
			.doc(usn)
			.set({
				createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
				email,
				password,
				name,
				usn,
				userId: userRecord.user.uid
			})

		return { isSuccess: true, message: `Successfully created new user: ${userRecord.user.uid}` }
	} catch (error) {
		return { isSuccess: false, message: error.message }
	}
}

async function login(accountDetails) {
	const { email, password } = accountDetails

	try {
		let userRecord = await fbauth.signInWithEmailAndPassword(email, password)
		return { isSuccess: true, message: `Successfully logged in user: ${userRecord.user.uid}` }
	} catch (error) {
		return { isSuccess: false, message: error.message }
	}
}

module.exports = {
	signup,
	login
}
