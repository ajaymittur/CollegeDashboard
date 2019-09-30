import { useState, useEffect } from "react"
import axios from "axios"

export default function useForm(ENDPOINT, validationFn) {
	const [errors, setErrors] = useState({})
	const [submit, setSubmit] = useState(false)
	const [formData, setFormData] = useState({})

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
		if (errors.passMatch === undefined) errors.passMatch = true

		if (submit && errors.allFilled && errors.correctEmail && errors.passMatch) {
			axios
				.post(ENDPOINT, {
					body: formData
				})
				.then(res => console.log(res.data))
				.catch(err => console.log(err))
		}
		setSubmit(false)
	}, [submit, formData])

	return { handleSubmit, handleChange, errors }
}
