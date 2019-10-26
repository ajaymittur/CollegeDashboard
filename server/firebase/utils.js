function processData(accountData) {
	const { email, usn, name } = accountData;

	const creds = creditsJSON(accountData);
	const marks = marksJSON(accountData);
	const attd = attendanceJSON(accountData);
	const subs = subjectsArray(accountData);
	const cgpa = marksToCGPA(creds, marks);

	return {
		email,
		usn,
		fullname: name,
		cgpa,
		subs,
		marks,
		creds,
		attd
	};
}

function marksToCGPA(creditsJSON, marksJSON) {
	let credArray = Object.values(creditsJSON).map(val => Number(val));
	let marksArray = Object.values(marksJSON).map(val => Number(val));
	let totalcreds = 0;
	let credmarksprod = 0;

	for (let i = 0; i < credArray.length; i++) {
		totalcreds += credArray[i];
		credmarksprod += credArray[i] * marksArray[i];
	}

	return credmarksprod / totalcreds;
}

function creditsJSON(data) {
	let credJSON = {};

	for (let key in data) {
		if (key.startsWith("credits")) {
			let subjectKey = "subject" + key.charAt(key.length - 1);
			let subject = data[subjectKey];
			credJSON[subject] = Number(data[key]);
		}
	}

	return credJSON;
}

function marksJSON(data) {
	let marksJSON = {};

	for (let key in data) {
		if (key.startsWith("marks")) {
			let subjectKey = "subject" + key.charAt(key.length - 1);
			let subject = data[subjectKey];
			marksJSON[subject] = Number(data[key]);
		}
	}

	return marksJSON;
}

function attendanceJSON(data) {
	let attdJSON = {};

	for (let key in data) {
		if (key.startsWith("attd")) {
			let subjectKey = "subject" + key.charAt(key.length - 1);
			let subject = data[subjectKey];
			attdJSON[subject] = Number(data[key]);
		}
	}

	return attdJSON;
}

function subjectsArray(data) {
	let subjectsArray = [];

	for (let key in data) {
		if (key.startsWith("subject")) {
			subjectsArray.push(data[key]);
		}
	}

	return subjectsArray;
}

module.exports = processData;
