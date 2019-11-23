function processData(accountData) {
	const { email, usn, name } = accountData;

	const credits = creditsJSON(accountData);
	const marks = marksJSON(accountData);
	const attendance = attendanceJSON(accountData);
	const subjects = subjectsArray(accountData);
	const cgpa = marksToCGPA(credits, marks);

	return {
		email,
		usn,
		fullname: name,
		cgpa,
		subjects,
		marks,
		credits,
		attendance
	};
}

function marksToCGPA(creditsJSON, marksJSON) {
	let credArray = Object.values(creditsJSON).map(val => Number(val));
	let gradesArray = marksToGrades(marksJSON);
	let totalcreds = 0;
	let credgradesprod = 0;

	for (let i = 0; i < credArray.length; i++) {
		totalcreds += credArray[i];
		credgradesprod += credArray[i] * gradesArray[i];
	}

	return credgradesprod / totalcreds;
}

function marksToGrades(marksJSON) {
	let marksArray = Object.values(marksJSON).map(val => Number(val));
	let gradesArray = Array();

	for (let marks of marksArray) {
		if (marks >= 90) gradesArray.push(10);
		else if (marks >= 75) gradesArray.push(9);
		else if (marks >= 60) gradesArray.push(8);
		else if (marks >= 50) gradesArray.push(7);
		else if (marks >= 40) gradesArray.push(6);
	}

	return gradesArray;
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
