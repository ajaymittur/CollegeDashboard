const admin = require("firebase-admin")

let serviceAccount = require("./college-dashboard-3rd-sem-firebase-adminsdk-8y4vn-e2f3ebd386")

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://college-dashboard-3rd-sem.firebaseio.com"
})

let db = admin.firestore()

async function login(accountDetails) {
	let userDataDoc = await db.doc("accounts/oqrwdYfqZCDqTjysdUJ1").get()
	let userData = userDataDoc.data()
	if (accountDetails.email === userData.email && accountDetails.password === userData.password)
		return true
	else return false
}

async function signup(accountDetails) {
	const { email, name, usn, password } = accountDetails
	try {
		let setDoc = db.collection('accounts').doc(usn).set({ email, password })
		return true
	} catch(err) {
		return false
	}
}

module.exports = {
	login,
	signup
}
// Write document with given data into collection
// db.collection("testcollection")
// 	.doc("testdoc")
// 	.set({
// 		test: "success"
// 	})

// Delete document from collection
// db.collection("testcollection")
// 	.doc("testdoc")
// 	.delete()

// Get document from collection and print to console
// db.collection("student")
// 	.doc("ajay")
// 	.get()
// 	.then(doc => console.log(doc.data()))
// 	.catch(console.log)

// Update/Add (if it doesn't exist) document field in collection
// db.collection("testcollection")
// 	.doc("testdoc")
// 	.update({
// 		test: "success"
// 	})

// Alternative syntax to access a document in a collection
// db.doc("collection/document")
