import React, { useState, useRef } from "react";
import { Header, Button, Grid, Form, Segment, Dimmer } from "semantic-ui-react";
import { Document, Page, Outline } from "react-pdf";
import { pdfjs } from "react-pdf";
import axios from "axios";
import PDF from "./PDF";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Notes({ studentData }) {
	const { usn, notes: Notes } = studentData;
	const [notes, setNotes] = useState(Notes);
	const [files, setFiles] = useState([]);
	const [showUploadFiles, setShowUploadFiles] = useState(false);
	const fileInputRef = useRef();

	const notesPDF = notes.map(link => <PDF link={link} key={link} />);
	const filesList = Object.values(files).map(file => file.name);

	const getNotes = async () => {
		try {
			const res = await axios.get(
				"https://college-dashboard-backend.herokuapp.com/notes"
				// "http://localhost:4000/student/getData"
			);
			setNotes(res.data.notes);
			console.log(res.data.message);
		} catch (err) {
			console.error(err.response.data.message);
		}
	};

	const handleSubmit = async () => {
		const formData = new FormData();
		formData.append("file", files);
		formData.append("usn", usn);
		try {
			const res = await axios.post(
				"https://college-dashboard-backend.herokuapp.com/notes/upload",
				// "http://localhost:4000/student/getData"
				formData
			);
			console.log(res.data.message);
		} catch (err) {
			console.error(err.response.data.message);
		}
	};

	const fileChange = e => {
		setFiles(...e.target.files);
	};

	if (!showUploadFiles)
		return (
			<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }} textAlign='center'>
					<Button onClick={() => setShowUploadFiles(true)}>Upload Notes</Button>
					<Button onClick={getNotes}>Refresh Notes</Button>
					{notesPDF}
				</Grid.Column>
			</Grid>
		);
	else
		return (
			<Dimmer active>
				<Form error size='large' onSubmit={handleSubmit}>
					<Segment raised inverted color='teal' secondary className='zoomIn'>
						<Form.Field>
							<Button content={filesList.join(", ") || "Choose Notes"} labelPosition='left' icon='file' onClick={() => fileInputRef.current.click()} />
							<input ref={fileInputRef} type='file' hidden onChange={fileChange} />
						</Form.Field>
						<Button type='submit' className='zoomIn'>
							Upload
						</Button>
						<Button onClick={() => setShowUploadFiles(false)} className='zoomIn'>
							Back
						</Button>
					</Segment>
					{/* {Object.entries(errors).length > 0 && <Message error header='Could Not Sign In' content='Email / Password is incorrect' size='small' className='zoomIn' />} */}
				</Form>
			</Dimmer>
		);
}

export default Notes;
