const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const fb = require("./firebase/functions");
const uploadpdf = require("./aws/upload");

// Enable CORS
app.use(function(req, res, next) {
	console.log(req.body);
	res.header("Access-Control-Allow-Origin", "*");
	// res.header("Access-Control-Allow-Origin", "https://collegedashboard.netlify.com");
	// res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Length, Accept");
	next();
});

app.use(express.json());

app.post("/account/login", async (req, res) => {
	let { isSuccess, message } = await fb.login(req.body);

	if (isSuccess) res.status(202);
	else res.status(400);

	res.send({ isSuccess, message });
});

app.post("/account/signup", async (req, res) => {
	let { isSuccess, message } = await fb.signup(req.body);

	if (isSuccess) res.status(201);
	else res.status(400);

	res.send({ isSuccess, message });
});

app.post("/account/reset", async (req, res) => {
	let { isSuccess, message } = await fb.resetPass(req.body.email);

	if (isSuccess) res.status(200);
	else res.status(400);

	res.send({ isSuccess, message });
});

app.get("/account/logout", async (req, res) => {
	let response = await fb.logout();

	res.send(response);
});

app.get("/student/getData", async (req, res) => {
	let data = await fb.getCurrentUser();

	if (data.isSuccess) res.status(200);
	else res.status(400);

	res.send(data);
});

app.post("/notes/upload", uploadpdf.any(), async (req, res) => {
	let response = await fb.addNotes(req.files, req.body.usn);

	if (response.isSuccess) res.status(200);
	else res.status(400);

	res.send(response);
});

app.get("/notes", async (req, res) => {
	let response = await fb.getNotes();

	if (response.isSuccess) res.status(200);
	else res.status(400);

	res.send(response);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
