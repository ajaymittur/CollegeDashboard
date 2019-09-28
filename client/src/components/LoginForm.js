import React, { useState } from "react"
import { Button, Form, Grid, Segment, Header, Message } from "semantic-ui-react"
import { Link, Redirect } from "react-router-dom"

function LoginForm() {
	const [signUp, setSignUp] = useState(false)
	document.title = "CollegeDashboard | Login"

	if (!signUp) {
		return (
			<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h3' color='orange' textAlign='center'>
						Hello, there. Login to your account
					</Header>
					<Form size='large'>
						<Segment raised inverted color='orange' secondary>
							<Form.Input fluid icon='address card' iconPosition='left' placeholder='Email' type='input' />
							<Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' />
							<Button type='submit'>Login</Button>
							<Button inverted onClick={() => setSignUp(true)}>
								Sign Up
							</Button>
						</Segment>
						<Message>
							Forgot your password? <Link to='/reset'>Reset</Link>
						</Message>
					</Form>
				</Grid.Column>
			</Grid>
		)
	} else {
		return <Redirect to='/signup' />
	}
}

export default LoginForm
