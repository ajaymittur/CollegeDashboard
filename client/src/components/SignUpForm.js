import React from "react"
import { Button, Form, Grid, Segment, Header, Message } from "semantic-ui-react"
import { Link, withRouter } from "react-router-dom"
import useForm from "../customHooks/useForm"

const ENDPOINT = "http://localhost:4000/account/signup"

function validate(data) {
	let errors = {}

	if (data.password !== data.repassword) errors.passMatch = "Passwords do not match"

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email))
		errors.correctEmail = "Enter a valid email address"

	if (!data.email || !data.password || !data.repassword || !data.name || !data.usn)
		errors.allFilled = "Make sure you fill in all the fields"

	return errors
}

function SignUpForm(props) {
	const [handleSubmit, handleChange, submitResponse, errors] = useForm(ENDPOINT, validate)
	document.title = "CollegeDashboard | Sign Up"

	if (submitResponse === true) props.history.push("/student/details")

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
						<Button type='submit'>Sign Up</Button>
						{Object.entries(errors).length > 0 && (
							<Message
								error
								header='Error Creating New User'
								list={Object.keys(errors).map(key => errors[key])}
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

export default withRouter(SignUpForm)
