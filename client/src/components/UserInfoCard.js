import React from "react";
import { Card, Image } from "semantic-ui-react";

function UserInfoCard({ studentData }) {
	const { fullname, email, CGPA, USN } = studentData;

	return (
		<Card centered>
			<Image
				src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
				wrapped
				ui={false}
			/>
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
				<Card.Description>{`${fullname} is a student with ${CGPA} CGPA.`}</Card.Description>
			</Card.Content>
		</Card>
	);
}

export default UserInfoCard;
