import React, { useState, useEffect } from "react"
import { Card, Dimmer, Loader, Image } from "semantic-ui-react"
import { VictoryPie } from "victory"
import Cards from "./Cards/Cards"
import axios from "axios"

// TODO: 1) All formatting/Styling/Height/Width/Line Breaking will be done later.

function InfoCards() {
	const [studentData, setStudentData] = useState({})
	const [fetchedData, setFetchedData] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get("http://localhost:4000/student/getData")
			setStudentData(res.data.userData)
			setFetchedData(true)
		}

		fetchData()
	}, [fetchedData])

	const { fullname, email, CGPA, subjects, attendance, marks, credits, USN } = studentData

	if (fetchedData == false)
		return (
			<div>
				<Dimmer active>
					<Loader size='large'>Loading Data</Loader>
				</Dimmer>
			</div>
		)
	else
		return (
			<div>
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
						)
					})}
				</Card.Group>
				<VictoryPie data={studentData} colorScale='qualitative' height={200} />
			</div>
		)
}

export default InfoCards
