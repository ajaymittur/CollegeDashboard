import React, { useState } from "react"
import { Button, Form, Grid, Segment, Header, Message } from "semantic-ui-react"
import { Link } from "react-router-dom"
import axios from 'axios'

function ResetPassForm() {
	document.title = "CollegeDashboard | Reset"

	function validate(e) {
		e.preventDefault()
		let email = e.target.email.value
		let usn = e.target.usn.value
		const data = {
			email: email,
			usn: usn
		}

		axios.post("http://localhost:4000/reset/submit", {
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
					<Form size='large' onSubmit={validate} error>
						<Segment raised inverted color='orange' secondary textAlign='left'>
							<Form.Input fluid   
							placeholder='Email' 
							name='email' 
							type='email'
							label='Enter Email'
							required />
							<Form.Input fluid  
							placeholder='USN' 
							name='usn' 
							type='text' 
							label='Enter USN' 
							required />
							<Button type='submit'>
								Reset
							</Button>
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
