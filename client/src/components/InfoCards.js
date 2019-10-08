import React, { useState, useEffect } from "react"
import { Card, Image } from "semantic-ui-react"
import { VictoryPie } from 'victory'
import Cards from './Cards/Cards'

/*Note: 1) All Data will be fetched using axios and will replace the static data.
	  	2) All formatting/Styling/Height/Width/Line Breaking will be done later.*/

function InfoCards() {
	/*const javaData =[
		{ x: "Attendance", y: 85 },
		{ x: "Marks", y: 80 }
	]
	const Data = [
		{x: "Java", y: 80},
		{x: "CIPE", y: 80},
		{x: "COA", y: 80},
		{x: "DM", y: 80},
		{x: "DS", y: 80},
		{x: "LD", y: 80},
		{x: "MP", y: 80},
		{x: "PW", y: 80}
	]*/

	const [studentData, setStudentData ] = useState({
		name: '',
		cgpa: '',
		subjects: [],
		attendance: [],
		marks: [],
		credits: [],
		data: []
	})

	/*useEffect(() => {
 		fetch('https://localhost:4000/:usn', {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
		usn: this.props.usn
		})
		})
		.then(response => response.json())
		.then(res => {
			setStudentData({...StudentData, StudentData {
			name: res[0].name,
			cgpa: res[0].cgpa,
			subjects : [...res[0].subjects],
			attendance : [...res[0].attendance],
			marks : [...res[0].marks],
			credits : [...res[0].credits]
			}}
			)
			for (let i = 0; i < this.state.subjects.len: ++i) {
				setStudentData({...StudentData,data : [...StudentData.data], { 
					x: studentData.subjects[i], 
					y: studentData.marks[i] }
					]
				})
			}
		})
	})*/
	const { name, cgpa, subjects, attendance, marks, credits, data } = studentData
	return (
		<div>
			<Card centered >
				<Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
				<Card.Content>
					<Card.Header>{`${ name }`}</Card.Header>
					<Card.Meta>
						<span>Student</span>
					</Card.Meta>
					<Card.Description>
						{`${ name } is a student with ${ cgpa } CGPA.`}
					</Card.Description>
				</Card.Content>
			</Card>
			<Card.Group centered itemsPerRow={4}>
				{
					this.state.subjects.map((sub, i) => {
						return (
							<Cards 
								key={i} 
								name={name} 
								subject={subjects[i]} 
								attendance={attendance[i]} 
								marks={marks[i]} 
								credits={credits[i]} 
							/>
						)
					})
				}
			</Card.Group>
			<VictoryPie 
			data={data} 
			colorScale="qualitative" 
			height={200} />
		</div>
	)
}

export default InfoCards