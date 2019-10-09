const express = require("express")
const app = express()
const PORT = 4000
// const db = require("./firebase/db")
const fb = require("./firebase/functions")

// Enable CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000") // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

app.use(express.json())

app.post("/account/login", async (req, res) => {
	let { isSuccess, message } = await fb.login(req.body)

	if (isSuccess) res.status(202)
	else res.status(400)

	res.send({ isSuccess, message })
})

app.post("/account/signup", async (req, res) => {
	let { isSuccess, message } = await fb.signup(req.body)

	if (isSuccess) res.status(201)
	else res.status(400)

	res.send({ isSuccess, message })
})

app.post("/account/reset", async (req, res) => {
	let { isSuccess, message } = await fb.resetPass(req.body.email)

	if (isSuccess) res.status(200)
	else res.status(400)

	res.send({ isSuccess, message })
})

app.get("/student/data", async (req, res) => {
	let data = await fb.getCurrentUser()

	if (data.isSuccess) res.status(200)
	else res.status(400)

	res.send(data)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
