import React from "react"
import { Card, Image } from "semantic-ui-react"
import { VictoryPie, VictoryBar, VictoryChart, VictoryAxis } from 'victory'
import './InfoCards.css'

/*Note: 1) All Data will be fetched using axios and will replace the static data.
	  	2) All formatting/Styling/Height/Width/Line Breaking will be done later.*/

function InfoCards() {
	/*fetch('https://localhost:4000/:usn', {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
		usn: this.props.usn
			})
		})
	.then(response => response.json())
	.then(res => {
		this.setState() or useState() => convert InfoCards into class
	})
	*/
	const javaData =[
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
	]
	return (
		<div>
			<Card className='grow' centered >
				<Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
				<Card.Content>
					<Card.Header>{`Jason`}</Card.Header>
					<Card.Meta>
						<span>Student</span>
					</Card.Meta>
					<Card.Description>
						{`Jason is a student with 9.6 CGPA.`}
					</Card.Description>
				</Card.Content>
			</Card>
	  		<Card.Group centered itemsPerRow={4}>
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
					    	data={javaData}
					    	barRatio={0.7}
					    	labels={({datum}) => datum.y}
					    	/>
					</VictoryChart>
				    <Card.Content>
				      <Card.Header>{`Java`}</Card.Header>
				      <Card.Meta>
				        <span>{`5 Credits`}</span>
				      </Card.Meta>
				      <Card.Description>
				        {`Jason has 85% attendance and 85/100 marks in Java`}
				      </Card.Description>
				    </Card.Content>
				</Card>
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
					    	data={javaData}
					    	barRatio={0.7}
					    	labels={({datum}) => datum.y}
					    	/>
					</VictoryChart>
				    <Card.Content>
				      <Card.Header>{`DS`}</Card.Header>
				      <Card.Meta>
				        <span>{`5 Credits`}</span>
				      </Card.Meta>
				      <Card.Description>
				        {`Jason has 85% attendance and 85/100 marks in DS`}
				      </Card.Description>
				    </Card.Content>
				</Card>
		  	</Card.Group>
			<VictoryPie data={Data} colorScale="qualitative" height={200} />
		</div>
	)
}

export default InfoCards