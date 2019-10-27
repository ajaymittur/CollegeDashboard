import React from "react";
import { Card, Header } from "semantic-ui-react";
import { VictoryPie } from "victory";
import Cards from "./Cards/Cards";

function Overview({ studentData }) {
	const { fullname, subjects, attendance, marks, credits } = studentData;

	let chartData = [];
	let i = 0;
	for (let mark in marks) {
		chartData.push({ x: Object.keys(marks)[i], y: mark });
		++i;
	}

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
			<Header
				size='huge'
				textAlign='center'
				color='orange'
				style={{ marginTop: "5%", fontSize: "400%" }}>
				Marks
			</Header>
			<VictoryPie data={chartData} colorScale='qualitative' height={200} />
		</div>
	);
}

export default Overview;
