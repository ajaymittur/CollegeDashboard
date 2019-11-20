import React from "react";
import "./styles/forms.css";
import { Button, Form, Grid, Segment, Header, Message } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import useForm from "../customHooks/useForm";

// const ENDPOINT = "https://college-dashboard-backend.herokuapp.com/account/reset";
const ENDPOINT = "http://localhost:4000/account/reset";

function validate(data) {
	let errors = {};

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email))
		errors.correctEmail = "Enter a valid email address";

	return errors;
}

function ResetPassForm(props) {
	const [handleSubmit, handleChange, , , submitResponse, errors] = useForm(ENDPOINT, validate);
	document.title = "CollegeDashboard | Reset";

	if (submitResponse === true) props.history.push("/");

	return (
		<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
			<Grid.Column textAlign='center' style={{ maxWidth: 450 }}>
				<Header as='h2' color='orange' textAlign='center' className='headers-effect zoomIn'>
					Reset Password
				</Header>
				<Form error size='large' onSubmit={handleSubmit}>
					<Segment raised inverted color='orange' secondary textAlign='left' className='zoomIn'>
						<Form.Input
							fluid
							onChange={handleChange}
							placeholder='Email'
							name='email'
							type='input'
							label='Enter Email'
						/>
						<Button type='submit'>Reset</Button>
						{Object.entries(errors).length > 0 && (
							<Message
								error
								header="Couldn't Reset Password"
								list={Object.keys(errors).map(key => errors[key])}
								size='small'
								className='zoomIn'
							/>
						)}
					</Segment>
					<Message className='zoomIn'>
						Want to Login? <Link to='/'>Sign In</Link>
					</Message>
				</Form>
			</Grid.Column>
		</Grid>
	);
}

export default withRouter(ResetPassForm);
