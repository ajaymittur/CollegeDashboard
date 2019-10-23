import React, { useState, useEffect } from "react"
import { Form, Button, Header, Grid, Segment, Message } from "semantic-ui-react"
import useForm from "../customHooks/useForm"
import axios from "axios"

const ENDPOINT = "http://localhost:4000/account/signup/test"

function validate(data) {
	let errors = {}

	if (typeof data.numsubjects !== "number")
		errors.numsubnan = "Number of subjects should be a number"

	for (let key in data)
		if (typeof data[key].startsWith("credits") !== "number")
			errors.crednan = "Credits should be numbers"

	if (isEmpty(data)) errors.allFilled = "Make sure you fill in all the fields"

	return errors
}

function isEmpty(obj) {
	for (var key in obj) {
		if (!obj.hasOwnProperty(key)) return true
	}
	return false
}

function FormExampleField() {
	const [subCount, setSubCount] = useState(0)
	const [formData, setFormData] = useState({})
	const [errors, setErrors] = useState({})
	const [submit, setSubmit] = useState(false)
	const [submitResponse, setSubmitResponse] = useState()

	const handleSubmit = e => {
		e.preventDefault()
		const err = validate(formData)
		setErrors(err)
		setSubmit(true)
	}

	const handleChange = e => {
		if (e.target.name === "numsubjects" && isNaN(e.target.value)) {
			setSubCount(0)
			setErrors({ numsubjects: "Number of subjects should be a number" })
		} else {
			setSubCount(Number(e.target.value))
			setFormData({
				...formData,
				[e.target.name]: e.target.value
			})
		}
	}

	useEffect(() => {
		if (submit && Object.entries(errors).length === 0) {
			axios
				.post(ENDPOINT, formData)
				.then(res => {
					setSubmitResponse(res.data.isSuccess)
					console.log(res.data.message)
				})
				.catch(error => {
					setSubmitResponse(error.response.data.isSuccess)
					setErrors({
						...errors,
						message: error.response.data.message
					})
					console.error(error.response.data.message)
				})
		}
		setSubmit(false)
	}, [submit])

	return (
		<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='orange' textAlign='center'>
					Just a few more details.
				</Header>
				<Form error onSubmit={handleSubmit}>
					<Segment raised inverted color='orange' secondary size='large' textAlign='left'>
						<Form.Input
							label='Number of subjects'
							name='numsubjects'
							onChange={handleChange}
							type='input'
						/>

						{[...Array(subCount)].map((e, i) => (
							<Form.Group widths='equal' key={i}>
								<Form.Input fluid name={`subject${i + 1}`} label={`Subject ${i + 1}`} />
								<Form.Input fluid name={`credits${i + 1}`} label={`Credits for subject ${i + 1}`} />
							</Form.Group>
						))}
						<Button>Submit</Button>
						{Object.entries(errors).length > 0 && (
							<Message
								error
								header='Error Signing Up'
								list={Object.keys(errors).map(key => errors[key])}
								size='mini'
							/>
						)}
					</Segment>
				</Form>
			</Grid.Column>
		</Grid>
	)
}

export default FormExampleField
