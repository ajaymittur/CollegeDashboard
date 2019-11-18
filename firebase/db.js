const admin = require("firebase-admin")

let serviceAccount = require("./college-dashboard-3rd-sem-firebase-adminsdk-8y4vn-e2f3ebd386")

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://college-dashboard-3rd-sem.firebaseio.com"
})

let db = admin.firestore()

async function login(accountDetails) {
	// const { email, password } = accountDetails
	// let userDataSnapshot = await db
	// 	.collection("accounts")
	// 	.where("email", "==", email)
	// 	.where("password", "==", password)
	// 	.get()
	// if (userDataSnapshot.empty) return false
	// else return true
}

module.exports = {}
