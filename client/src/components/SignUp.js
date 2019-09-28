import React, { useState } from "react"
import { Button, Form, Grid, Segment, Header, Message } from "semantic-ui-react"
import { Link } from "react-router-dom"

function SignUp() {
	const [passMatch, setPassMatch] = useState(true)
	const [correctEmail, setCorrectEmail] = useState(true)

	document.title = "CollegeDashboard | Sign Up"

	function validateAndSubmit(e) {
		e.preventDefault()
		let email = e.target.email.value
		let pass = e.target.password.value
		let repass = e.target.repassword.value
		console.log(e.target.value)

		if (pass !== repass) setPassMatch(false)
		else setPassMatch(true)

		if (!email.includes("@") || !email.includes(".")) setCorrectEmail(false)
		else setCorrectEmail(true)

		if (passMatch && correctEmail)
			fetch("/signup/submit", {
				method: "POST",
				body: new FormData(e.target)
			})
	}

	return (
		<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h3' textAlign='center' color='orange'>
					Create your account
				</Header>
				<Form error size='large' onSubmit={validateAndSubmit}>
					<Segment raised inverted color='orange' secondary size='large' textAlign='left'>
						<Form.Input fluid label='Enter Email' placeholder='Email' name='email' type='input' />
						{correctEmail === false && <Message error header='Wrong email' content='Check your email address!' size='small' />}
						<Form.Input fluid label='Enter Name' placeholder='Name' name='name' type='input' />
						<Form.Input fluid label='Enter Password' placeholder='Password' name='password' type='password' />
						<Form.Input fluid label='Re-enter Password' placeholder='Password' name='repassword' type='password' />
						{passMatch === false && <Message error header='Passwords do not match' content='Make sure you re-enter the same password' size='small' />}
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
