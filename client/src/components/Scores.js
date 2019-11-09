import React from "react";
import { Card, Header, Grid } from "semantic-ui-react";
import { VictoryPie } from "victory";

function Scores({ studentData }) {
	const { fullname, subjects, attendance, marks, credits } = studentData;

	let chartData = [];
	let i = 0;
	for (let mark in marks) {
		chartData.push({ x: Object.keys(marks)[i], y: mark });
		++i;
	}

	return (
		<div>
			<Header size='large' textAlign='center' color='orange' style={{ marginTop: "5%" }}>
				Marks
			</Header>
			<VictoryPie data={chartData} colorScale='qualitative' height={300} />
		</div>
	);
}

export default Scores;
