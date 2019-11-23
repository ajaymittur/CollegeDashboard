import React from "react";
import { Card, Image } from "semantic-ui-react";

function UserInfoCard({ studentData }) {
	const { fullname, email, cgpa, USN, profilepic } = studentData;
	console.log(studentData);

	return (
		<Card centered>
			<Image src={profilepic} wrapped ui={false} />
			<Card.Content>
				<Card.Header>{`${fullname}`}</Card.Header>
				<Card.Meta>
					<span>Student</span>
				</Card.Meta>
				<Card.Meta>
					<span>USN: {USN}</span>
				</Card.Meta>
				<Card.Meta>
					<span>Email: {email}</span>
				</Card.Meta>
				<Card.Description>{`${fullname} is a student with ${cgpa} CGPA.`}</Card.Description>
			</Card.Content>
		</Card>
	);
}

export default UserInfoCard;
