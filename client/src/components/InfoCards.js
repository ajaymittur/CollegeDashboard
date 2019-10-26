import React, { useState, useEffect } from "react";
import { Card, Dimmer, Loader, Header } from "semantic-ui-react";
import { VictoryPie } from "victory";
import Cards from "./Cards/Cards";
import Navbar from "./Navbar";
import axios from "axios";

function InfoCards() {
	const [studentData, setStudentData] = useState({});
	const [didFetchData, setDidFetchData] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get("http://localhost:4000/student/getData");
			setStudentData(res.data.userData);
			setDidFetchData(true);
		};

		fetchData();
	}, [didFetchData]);

	const { fullname, email, CGPA, subjects, attendance, marks, credits, USN } = studentData;
	let chartData = [];
	let i = 0;
	for (let mark in marks) {
		chartData.push({ x: Object.keys(marks)[i], y: mark });
		++i;
	}

	if (didFetchData === false)
		return (
			<div>
				<Dimmer active>
					<Loader size='large'>Loading Data</Loader>
				</Dimmer>
			</div>
		);
	else
		return (
			<div>
				{/*<Card centered>
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
				</Card>*/}

				<Navbar name={fullname} />

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

export default InfoCards;
