import React from "react"
import { Button, Form, Grid, Segment, Header, Message } from "semantic-ui-react"
import { Link } from "react-router-dom"
import useForm from "../customHooks/useForm"

const ENDPOINT = "http://localhost:4000/account/signup"

function validate(data) {
	let errors = {}

	if (data.password !== data.repassword) errors.passMatch = false
	else errors.passMatch = true

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) errors.correctEmail = false
	else errors.correctEmail = true

	if (!data.email || !data.password || !data.repassword || !data.name || !data.usn)
		errors.allFilled = false
	else errors.allFilled = true

	return errors
}

function SignUpForm() {
	const { handleSubmit, handleChange, errors } = useForm(ENDPOINT, validate)
	document.title = "CollegeDashboard | Sign Up"

	return (
		<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' textAlign='center' color='orange'>
					Create your account
				</Header>
				<Form error size='large' onSubmit={handleSubmit}>
					<Segment raised inverted color='orange' secondary size='large' textAlign='left'>
						<Form.Input
							fluid
							onChange={handleChange}
							label='Enter Email'
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
							/>
						)}
						<Form.Input
							fluid
							onChange={handleChange}
							label='Enter Name'
							placeholder='Name'
							name='name'
							type='input'
						/>
						<Form.Input
							fluid
							onChange={handleChange}
							label='Enter USN'
							placeholder='USN'
							name='usn'
							type='input'
						/>
						<Form.Input
							fluid
							onChange={handleChange}
							label='Enter Password'
							placeholder='Password'
							name='password'
							type='password'
						/>
						<Form.Input
							fluid
							onChange={handleChange}
							label='Re-enter Password'
							placeholder='Password'
							name='repassword'
							type='password'
						/>
						{errors.passMatch === false && (
							<Message
								error
								header='Passwords do not match'
								content='Make sure you re-enter the same password'
								size='small'
							/>
						)}
						<Button type='submit'>Sign Up</Button>
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
						Already have an account? <Link to='/'>Login</Link>
					</Message>
				</Form>
			</Grid.Column>
		</Grid>
	)
}

export default SignUpForm
