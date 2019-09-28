import React from "react"
import { Button, Form, Grid, Segment, Header, Message } from "semantic-ui-react"
import { Link, Redirect } from "react-router-dom"

function SignUp() {
	document.title = "CollegeDashboard | Sign Up"

	return (
		<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h3' textAlign='center' color='orange'>
					Create your account
				</Header>
				<Form size='large'>
					<Segment raised inverted color='orange' secondary size='large' textAlign='left'>
						<Form.Input fluid label='Enter Email' placeholder='Email' type='input' />
						<Form.Input fluid label='Enter Name' placeholder='Name' type='input' />
						<Form.Input fluid label='Enter Password' placeholder='Password' type='password' />
						<Form.Input fluid label='Re-enter Password' placeholder='Password' type='password' />
						<Button type='submit'>Sign Up</Button>
					</Segment>
					<Message>
						Already have an account? <Link to='/'>Login</Link>
					</Message>
				</Form>
			</Grid.Column>
		</Grid>
	)
}

export default SignUp
