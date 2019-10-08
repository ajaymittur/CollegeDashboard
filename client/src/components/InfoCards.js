import React from "react"
import { Card, Image } from "semantic-ui-react"
import { VictoryPie } from 'victory'
import Cards from './Cards/Cards'

/*Note: 1) All Data will be fetched using axios and will replace the static data.
	  	2) All formatting/Styling/Height/Width/Line Breaking will be done later.*/

class InfoCards extends React.Component {
	/*fetch('https://localhost:4000/:usn', {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
		usn: this.props.usn
			})
		})
	.then(response => response.json())
	.then(res => {
		this.setState(name: res.name)
		this.setState(cgpa: res.cgpa)
	})
	*/
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
	constructor() {
		super()
		this.state = {
			name: '',
			cgpa: '',
			subject: [],
			attendance: [],
			marks: [],
			credits: [],
			data: [],
			counter: 0
		}
	}

	/*componentDidMount(props){
 		fetch('https://localhost:4000/:usn', {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
		usn: this.props.usn
		})
		})
		.then(response => response.json())
		.then(res => {
			this.setState({name: res[0].name})
			this.setState({cgpa: res[0].cgpa})
			this.setState({subjects : [...res[0].subjects]})
			this.setState({attendance : [...res[0].attendance]})
			this.setState({marks : [...res[0].marks]})
			this.setState({credits : [...res[0].credits]})
			for (let i = 0; i < this.state.subjects.len: ++i) {
				this.setState({data : [...this.state.data, { 
					x: this.state.subjects[i], 
					y: this.state.marks[i] }
					]
				})
			}
		})
	}*/

	render(){
		const { name, cgpa } = this.state
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
							this.setState({counter: this.state.counter + 1})
							return (
								<Cards 
									key={i} 
									name={name} 
									subject={this.state.subjects[i]} 
									attendance={this.state.attendance[i]} 
									marks={this.state.marks[i]} 
									credits={this.state.credits[i]} 
								/>
							)
						})
					}
				</Card.Group>
				<VictoryPie 
				data={this.state.data} 
				colorScale="qualitative" 
				height={200} />
			</div>
		)

	}
}

export default InfoCards