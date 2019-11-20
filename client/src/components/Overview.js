import React from "react";
import { Card } from "semantic-ui-react";
import Cards from "./Cards/Cards";

function Overview({ studentData }) {
	const { fullname, subjects, attendance, marks, credits } = studentData;

	return (
		<div>
			<Card.Group centered itemsPerRow={4}>
				{subjects.map((sub, i) => {
					return (
						<Cards
							key={i}
							name={fullname}
							subject={subjects[i]}
							attendance={attendance[sub]}
							marks={marks[sub]}
							credits={credits[sub]}
						/>
					);
				})}
			</Card.Group>
		</div>
	);
}

export default Overview;
