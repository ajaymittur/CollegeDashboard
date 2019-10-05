const admin = require("firebase-admin")

let serviceAccount = require("./college-dashboard-3rd-sem-firebase-adminsdk-8y4vn-e2f3ebd386")

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://college-dashboard-3rd-sem.firebaseio.com"
})

let db = admin.firestore()

async function login(accountDetails) {
	let userDataSnapshot = await db
		.collection("accounts")
		.where("email", "==", accountDetails.email)
		.where("password", "==", accountDetails.password)
		.get()

	if (userDataSnapshot.empty) return false
	else return true
}

async function signup(accountDetails) {
	const { email, name, usn, password } = accountDetails
	db.collection("accounts")
		.add({ name, email, password, usn })
		.catch(err => {
			console.error(err)
			return false
		})
	return true
}

module.exports = {
	login,
	signup
}
