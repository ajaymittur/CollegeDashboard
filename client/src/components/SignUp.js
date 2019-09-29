import React, { useState } from "react"
import { Button, Form, Grid, Segment, Header, Message } from "semantic-ui-react"
import { Link } from "react-router-dom"
import axios from "axios"


function SignUp() {
	const [passMatch, setPassMatch] = useState(true)

	document.title = "CollegeDashboard | Sign Up"

	function validateAndSubmit(e) {
		e.preventDefault()
		let email = e.target.email.value
		let pass = e.target.password.value
		let repass = e.target.repassword.value
		let name = e.target.name.value
		let usn = e.target.usn.value
		const data = {
			email: email,
			password: pass,
			name: name,
			usn: usn
		}

		if (pass !== repass) setPassMatch(false)
		else setPassMatch(true)

		if (passMatch)
			axios.post("http://localhost:4000/signup/submit", {
					body: data
				})
				.then(res => console.log(res.data))
				.catch(err => console.log(err))
	}

	return (
		<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' textAlign='center' color='orange'>
					Create your account
				</Header>
				<Form error size='large' onSubmit={validateAndSubmit}>
					<Segment raised inverted color='orange' secondary size='large' textAlign='left'>
						<Form.Input fluid label='Enter Email' 
						placeholder='Email' 
						name='email' 
						type='input'
						required />
						<Form.Input fluid label='Enter Name' 
						placeholder='Name' 
						name='name' 
						type='input'
						required />
						<Form.Input fluid label='Enter USN' 
						placeholder='USN' 
						name='usn' 
						type='input'
						required />
						<Form.Input fluid label='Enter Password' 
						placeholder='Password' 
						name='password' 
						type='password'
						required />
						<Form.Input fluid label='Re-enter Password' 
						placeholder='Password' 
						name='repassword' 
						type='password'
						required />
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
