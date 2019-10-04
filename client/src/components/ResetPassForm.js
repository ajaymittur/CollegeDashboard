// TODO: fix correctEmail and allFilled value updating in next submit issue

import React from "react"
import { Button, Form, Grid, Segment, Header, Message } from "semantic-ui-react"
import { Link } from "react-router-dom"
import useForm from "../customHooks/useForm"

const ENDPOINT = "http://localhost:4000/account/reset"

function validate(data) {
	let errors = {}

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) errors.correctEmail = false
	else errors.correctEmail = true

	if (!data.email || !data.usn) errors.allFilled = false
	else errors.allFilled = true

	return errors
}

function ResetPassForm() {
	const { handleSubmit, handleChange, errors } = useForm(ENDPOINT, validate)
	document.title = "CollegeDashboard | Reset"

	return (
		<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
			<Grid.Column textAlign='center' style={{ maxWidth: 450 }}>
				<Header as='h2' color='orange' textAlign='center'>
					Reset Password
				</Header>
				<Form error size='large' onSubmit={handleSubmit}>
					<Segment raised inverted color='orange' secondary textAlign='left'>
						<Form.Input
							fluid
							onChange={handleChange}
							placeholder='Email'
							name='email'
							type='input'
							label='Enter Email'
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
							placeholder='USN'
							name='usn'
							type='text'
							label='Enter USN'
						/>
						<Button type='submit'>Reset</Button>
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
						Want to Login? <Link to='/'>Sign In</Link>
					</Message>
				</Form>
			</Grid.Column>
		</Grid>
	)
}

export default ResetPassForm
