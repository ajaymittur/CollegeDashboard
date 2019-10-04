const express = require("express")
const app = express()
const PORT = 4000
const db = require("./database/db")

// Enable CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000") // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

app.use(express.json())

app.post("/account/login", async (req, res) => {
	let isSuccess = await db.login(req.body)
	if (isSuccess) res.send({ isSuccess, message: "Login Successful" })
	else res.status(400).send({ isSuccess, message: "Unable to find user in database" })
})

app.post("/account/signup", (req, res) => {
	console.log("SignUp:", req.body)
	let signupSuccess = await db.signup(req.body)
	if (!signupSuccess) res.status(400).json('Unable to signup')
	else res.send(signupSuccess)
})

app.post("/account/reset", (req, res) => {
	console.log("Reset:", req.body)
	res.send(req.body)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
