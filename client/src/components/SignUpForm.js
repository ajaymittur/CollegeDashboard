/* eslint-disable default-case */
import "./styles/forms.css";
import React, { useState } from "react";
import { Button, Form, Grid, Segment, Header, Message, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import useForm from "../customHooks/useForm";

const ENDPOINT = "https://college-dashboard-backend.herokuapp.com/account/signup";
// const ENDPOINT = "http://localhost:4000/account/signup";

function validate(data) {
	let errors = {};

	if (data.password !== data.repassword) errors.passMatch = "Passwords do not match";
	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) errors.correctEmail = "Enter a valid email address";
	if (!data.email || !data.password || !data.repassword || !data.name || !data.usn) errors.allFilled = "Make sure you fill in all the fields";
	for (let key in data) if (key.startsWith("credits") && isNaN(Number(data[key]))) errors.crednan = "Credits should be numbers";
	for (let key in data) if (key.startsWith("marks") && isNaN(Number(data[key]))) errors.marksnan = "Marks should be numbers";
	for (let key in data) if (key.startsWith("attd") && isNaN(Number(data[key]))) errors.attdnan = "Attendance should be numbers";
	if (notComplete(data, Number(data.numsubjects))) errors.allFilled = "Make sure you fill in all subject fields";

	return errors;
}

function notComplete(obj, subCount) {
	for (let i = 0; i < subCount; i++) {
		if (!obj.hasOwnProperty(`subject${i + 1}`) || !obj.hasOwnProperty(`credits${i + 1}`)) return true;
	}
	return false;
}

function SignUpForm(props) {
	const [handleSubmit, handleChange, formData, setFormData, submitResponse, errors, setErrors] = useForm(ENDPOINT, validate);
	const [subCount, setSubCount] = useState(0);
	const [newSec, setNewSec] = useState(0);

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

	switch (newSec) {
		case 0:
			return (
				<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
					<Grid.Column style={{ maxWidth: 500 }}>
						<Header as='h2' textAlign='center' style={{ color: "#008080" }} className='zoomIn'>
							Create your account
						</Header>
						<Form error size='large' onSubmit={handleSubmit}>
							<Segment raised inverted color='teal' secondary size='large' textAlign='left' className='zoomIn'>
								<Form.Group widths='equal'>
									<Image src={formData.profilepic || "https://react.semantic-ui.com/images/wireframe/square-image.png"} size='tiny' circular />
									<Form.Input fluid onChange={handleChange} label='Link to profile picture' placeholder='Copy the image address and paste here' name='profilepic' type='input' className='zoomIn' value={formData.profilepic || ""} />
								</Form.Group>

								<Form.Group widths='equal'>
									<Form.Input fluid onChange={handleChange} label='Enter Email' placeholder='Email' name='email' type='input' className='zoomIn' value={formData.email || ""} />
									<Form.Input fluid onChange={handleChange} label='Enter Name' placeholder='Name' name='name' type='input' className='zoomIn' value={formData.name || ""} />
									<Form.Input fluid onChange={handleChange} label='Enter USN' placeholder='USN' name='usn' type='input' className='zoomIn' value={formData.usn || ""} />
								</Form.Group>

								<Form.Input fluid onChange={handleChange} label='Enter Password' placeholder='Password' name='password' type='password' className='zoomIn' value={formData.password || ""} />
								<Form.Input fluid onChange={handleChange} label='Re-enter Password' placeholder='Password' name='repassword' type='password' className='zoomIn' value={formData.repassword || ""} />
								<Form.Input label='Number of subjects' name='numsubjects' onChange={handleChangeNumSubjects} type='input' className='zoomIn' value={formData.numsubjects || ""} />
								<Button type='button' onClick={() => setNewSec(1)}>
									Next
								</Button>
							</Segment>
							<Message className='zoomIn'>
								Already have an account? <Link to='/login'>Login</Link>
							</Message>
						</Form>
					</Grid.Column>
				</Grid>
			);

		case 1:
			return (
				<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
					<Grid.Column style={{ maxWidth: 450 }}>
						<Header as='h2' textAlign='center' style={{ color: "#008080" }} className='zoomIn'>
							Create your account
						</Header>
						<Form error size='large' onSubmit={handleSubmit}>
							<Segment raised inverted color='teal' secondary size='large' textAlign='left' className='zoomIn'>
								{[...Array(subCount)].map((e, i) => (
									<Form.Group widths='equal' key={i}>
										<Form.Input fluid name={`subject${i + 1}`} label={`Subject ${i + 1}`} onChange={handleChange} className='zoomIn' value={formData[`subject${i + 1}`] || ""} />
										<Form.Input fluid name={`credits${i + 1}`} label='Credits' onChange={handleChange} className='zoomIn' value={formData[`credits${i + 1}`] || ""} />
										<Form.Input fluid name={`marks${i + 1}`} label={`Marks`} onChange={handleChange} className='zoomIn' value={formData[`marks${i + 1}`] || ""} />
										<Form.Input fluid name={`attd${i + 1}`} label='Attendance' onChange={handleChange} className='zoomIn' value={formData[`attd${i + 1}`] || ""} />
									</Form.Group>
								))}
								<Button type='submit'>Sign Up</Button>
								<Button type='button' inverted onClick={() => setNewSec(0)}>
									Back
								</Button>
								{Object.entries(errors).length > 0 && <Message error header='Error Creating New User' list={Object.keys(errors).map(key => errors[key])} size='small' className='zoomIn' />}
							</Segment>
							<Message className='zoomIn'>
								Already have an account? <Link to='/'>Login</Link>
							</Message>
						</Form>
					</Grid.Column>
				</Grid>
			);
	}
}

export default withRouter(SignUpForm);
