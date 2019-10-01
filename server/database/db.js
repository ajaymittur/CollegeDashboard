const admin = require("firebase-admin")

let serviceAccount = require("./college-dashboard-3rd-sem-firebase-adminsdk-8y4vn-e2f3ebd386")

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://college-dashboard-3rd-sem.firebaseio.com"
})

let db = admin.firestore()

// Write document with given data into collection
db.collection("testcollection")
	.doc("testdoc")
	.set({
		test: "success"
	})

// Delete document from collection
db.collection("testcollection")
	.doc("testdoc")
	.delete()

// Get document from collection and print to console
db.collection("testcollection")
	.doc("testdoc")
	.get()
	.then(doc => console.log(doc.data()))
	.catch(console.log)

// Updata document field in collection
db.collection("testcollection")
	.doc("testdoc")
	.update({
		test: "failure"
	})
