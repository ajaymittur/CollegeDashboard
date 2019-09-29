import React, { useState } from "react"
import { Button, Form, Grid, Segment, Header, Message } from "semantic-ui-react"
import { Link } from "react-router-dom"
import axios from "axios"

function ResetPassForm() {
	document.title = "CollegeDashboard | Reset"

	function validateAndSubmit(e) {
		e.preventDefault()
		let email = e.target.email.value
		let usn = e.target.usn.value
		const data = {
			email: email,
			usn: usn
		}
    
		if (!(email.includes("@") && email.includes("."))) {
			setCorrectEmail(false)
			return
		} else setCorrectEmail(true)

		if (!email || !usn) {
			setAllFilled(false)
			return
		} else setAllFilled(true)

		if (correctEmail && allFilled)
			axios
				.post("http://localhost:4000/reset/submit", {
					body: data
				})
				.then(res => console.log(res.data))
				.catch(err => console.log(err))
	}

	return (
		<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
			<Grid.Column textAlign='center' style={{ maxWidth: 450 }}>
				<Header as='h2' color='orange' textAlign='center'>
					Reset Password
				</Header>
				<Form size='large' onSubmit={validateAndSubmit} error>
					<Segment raised inverted color='orange' secondary textAlign='left'>
						<Form.Input fluid placeholder='Email' name='email' type='input' label='Enter Email' />
						{correctEmail === false && (
							<Message
								error
								header='Invalid email'
								content='Check your email address'
								size='small'
							/>
						)}
						<Form.Input fluid placeholder='USN' name='usn' type='text' label='Enter USN' />
						<Button type='submit'>Reset</Button>
						{allFilled === false && (
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
