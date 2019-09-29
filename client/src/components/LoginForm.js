import React, { useState } from "react"
import { Button, Form, Grid, Segment, Header, Message } from "semantic-ui-react"
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'

function LoginForm() {
	const [signUp, setSignUp] = useState(false)
	document.title = "CollegeDashboard | Login"

	function validate(e) {
		e.preventDefault()
		let email = e.target.email.value
		let password = e.target.password.value
		const data = {
			email: email,
			password: password
		}

		axios.post("http://localhost:4000/reset/submit", {
					body: data
			})
			.then(res => console.log(res.data))
			.catch(err => console.log(err))
	}

	if (!signUp) {
		return (
			<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h2' color='orange' textAlign='center'>
						Hello, there. Login to your account
					</Header>
					<Form size='large' error>
						<Segment raised inverted color='orange' secondary>
							<Form.Input fluid icon='address card' 
							iconPosition='left'
							placeholder='Email' 
							name='email' 
							type='email'
							required />
							<Form.Input fluid icon='lock' 
							iconPosition='left' 
							placeholder='Password' 
							name='password' 
							type='password'
							required />
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
