// TODO: Implement wrong username/password error message

import React, { useState } from "react"
import { Button, Form, Grid, Segment, Header, Message } from "semantic-ui-react"
import { Link, Redirect } from "react-router-dom"
import useForm from "../customHooks/useForm"

const ENDPOINT = "http://localhost:4000/login/submit"

function validate(data) {
	let errors = {}

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) errors.correctEmail = false
	else errors.correctEmail = true

	if (!data.email || !data.password) errors.allFilled = false
	else errors.allFilled = true

	return errors
}

function LoginForm() {
	const [signUp, setSignUp] = useState(false)
	const { handleSubmit, handleChange, errors } = useForm(ENDPOINT, validate)
	document.title = "CollegeDashboard | Login"

	if (!signUp) {
		return (
			<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h2' color='orange' textAlign='center'>
						Hello, there. Login to your account
					</Header>

					<Form error size='large' onSubmit={handleSubmit}>
						<Segment raised inverted color='orange' secondary>
							<Form.Input
								fluid
								onChange={handleChange}
								icon='address card'
								iconPosition='left'
								placeholder='Email'
								name='email'
								type='input'
							/>
							{errors.correctEmail === false && (
								<Message
									error
									header='Invalid email'
									content='Check your email address'
									size='small'
									textAlign='left'
								/>
							)}
							<Form.Input
								fluid
								onChange={handleChange}
								icon='lock'
								iconPosition='left'
								placeholder='Password'
								name='password'
								type='password'
							/>
							<Button type='submit'>Login</Button>
							<Button inverted onClick={() => setSignUp(true)}>
								Sign Up
							</Button>
							{errors.allFilled === false && (
								<Message
									error
									header='All fields compulsory'
									content='Make sure you fill in all the fields'
									size='small'
								/>
							)}
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
