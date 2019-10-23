import { useState, useEffect } from "react"
import axios from "axios"

export default function useForm(ENDPOINT, validationFn) {
	const [errors, setErrors] = useState({})
	const [submit, setSubmit] = useState(false)
	const [formData, setFormData] = useState({})
	const [submitResponse, setSubmitResponse] = useState()

	const handleSubmit = e => {
		e.preventDefault()
		const err = validationFn(formData)
		setErrors(err)
		setSubmit(true)
	}

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
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
	}, [submit, formData])

	return [handleSubmit, handleChange, formData, setFormData, submitResponse, errors, setErrors]
}
