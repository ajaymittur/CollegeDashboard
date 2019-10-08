import React from "react"
import { Card, Image } from "semantic-ui-react"
import { VictoryPie, VictoryBar, VictoryChart, VictoryAxis } from 'victory'
import './Card.css'

class Card extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: this.props.name,
			cgpa: this.props.cgpa,
			subject: this.props.subject,
			attendance: this.props.attendance,
			marks: this.props.marks,
			credits: this.props.credits,
			data: [
				{ x: "Attendance", y: this.props.attendance },
				{ x: "Marks", y: this.props.marks }
			]
		}
	}

	render(){
		const { name, cgpa, subject, attendance, marks, credits } = this.state
		return (
			<div>
	  			<Card className='grow' raised>
					<VictoryChart 
						domainPadding={100} 
						domain={{y: [0, 60]}}>

						<VictoryAxis tickValues={
							["Attendance", "Marks"]}
          				/>
						<VictoryAxis dependentAxis
            				tickFormat={100} 
            				/>
						<VictoryBar
					    	style={{ data: { fill: "#f5a153" } }}
					    	data={}
					    	barRatio={0.7}
					    	labels={({datum}) => datum.y}
					    	/>
					</VictoryChart>
				    <Card.Content>
				      <Card.Header>{`${ subject }`}</Card.Header>
				      <Card.Meta>
				        <span>{`${ credits } Credits`}</span>
				      </Card.Meta>
				      <Card.Description>
				        {`${ name } has ${ attendance }% attendance and ${ marks }/100 marks in ${ subject }`}
				      </Card.Description>
				    </Card.Content>
				</Card>
			</div>
		)
	}
	
}

export default InfoCards