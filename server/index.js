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
	let loginSuccess = await db.login(req.body.formData)
	res.send(loginSuccess)
})

app.post("/account/signup", (req, res) => {
	console.log("SignUp:", req.body.formData)
	res.send(req.body.formData)
})

app.post("/account/reset", (req, res) => {
	console.log("Reset:", req.body.formData)
	res.send(req.body.formData)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
