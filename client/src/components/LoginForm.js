import React from "react"
import { Button, Form, Grid, Segment, Header, Message } from "semantic-ui-react"

function LoginForm() {
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
						<Button inverted>Sign Up</Button>
					</Segment>
					<Message>
						Forgot your password? <a href='#'>reset</a>
					</Message>
				</Form>
			</Grid.Column>
		</Grid>
	)
}

export default LoginForm
