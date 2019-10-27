import "./styles/forms.css";
import React, { useState } from "react";
import { Button, Form, Grid, Segment, Header, Message } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import useForm from "../customHooks/useForm";

const ENDPOINT = "http://localhost:4000/account/signup";

function validate(data) {
	let errors = {};

	if (data.password !== data.repassword) errors.passMatch = "Passwords do not match";

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email))
		errors.correctEmail = "Enter a valid email address";

	if (!data.email || !data.password || !data.repassword || !data.name || !data.usn)
		errors.allFilled = "Make sure you fill in all the fields";

	for (let key in data)
		if (key.startsWith("credits") && isNaN(Number(data[key])))
			errors.crednan = "Credits should be numbers";

	for (let key in data)
		if (key.startsWith("marks") && isNaN(Number(data[key])))
			errors.marksnan = "Marks should be numbers";

	for (let key in data)
		if (key.startsWith("attd") && isNaN(Number(data[key])))
			errors.attdnan = "Attendance should be numbers";

	if (notComplete(data, Number(data.numsubjects)))
		errors.allFilled = "Make sure you fill in all subject fields";

	return errors;
}

function notComplete(obj, subCount) {
	for (let i = 0; i < subCount; i++) {
		if (!obj.hasOwnProperty(`subject${i + 1}`) || !obj.hasOwnProperty(`credits${i + 1}`))
			return true;
	}
	return false;
}

function SignUpForm(props) {
	const [
		handleSubmit,
		handleChange,
		formData,
		setFormData,
		submitResponse,
		errors,
		setErrors
	] = useForm(ENDPOINT, validate);
	const [subCount, setSubCount] = useState(0);
	document.title = "CollegeDashboard | Sign Up";

	const handleChangeNumSubjects = e => {
		if (e.target.name === "numsubjects" && isNaN(e.target.value)) {
			setSubCount(0);
			setErrors({
				...errors,
				numsubjects: "Number of subjects should be a number"
			});
		} else {
			setSubCount(Number(e.target.value));
			setFormData({
				...formData,
				[e.target.name]: e.target.value
			});
		}
	};

	if (submitResponse === true) props.history.push("/");

	return (
		<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' textAlign='center' color='orange' className='headers-effect'>
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
						<Form.Input
							label='Number of subjects'
							name='numsubjects'
							onChange={handleChangeNumSubjects}
							type='input'
						/>
						{[...Array(subCount)].map((e, i) => (
							<Form.Group widths='equal' key={i}>
								<Form.Input
									fluid
									name={`subject${i + 1}`}
									label={`Subject ${i + 1}`}
									onChange={handleChange}
								/>
								<Form.Input
									fluid
									name={`credits${i + 1}`}
									label='Credits'
									onChange={handleChange}
								/>
								<Form.Input fluid name={`marks${i + 1}`} label={`Marks`} onChange={handleChange} />
								<Form.Input
									fluid
									name={`attd${i + 1}`}
									label='Attendance'
									onChange={handleChange}
								/>
							</Form.Group>
						))}
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
	);
}

export default withRouter(SignUpForm);
