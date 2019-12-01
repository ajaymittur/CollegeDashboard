import React, { useState } from "react";
import { Header, Button, Grid, Form, Segment, Icon } from "semantic-ui-react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDF(props) {
	const [pageNumber, setPageNumber] = useState(1);
	const [numPages, setNumPages] = useState(null);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
		setPageNumber(1);
	};

	const nextPage = () => {
		if (pageNumber < numPages) setPageNumber(pageNumber + 1);
	};
	const prevPage = () => {
		if (pageNumber > 1) setPageNumber(pageNumber - 1);
	};

	return (
		<Segment raised inverted color='teal' secondary compact>
			<Button icon onClick={prevPage} attached='top'>
				<a href={props.link} download>
					Download
				</a>
				<Icon name='download' />
			</Button>
			<Document file={props.link} key={props.link} onLoadSuccess={onDocumentLoadSuccess}>
				<Page pageNumber={pageNumber} height={500} onLoadProgress={({ loaded, total }) => console.log("Loading a document: " + (loaded / total) * 100 + "%")} />
			</Document>
			<p>Page {pageNumber} / {numPages}</p>
			<Button icon labelPosition='left' onClick={prevPage}>
				<Icon name='left arrow' />
				Prev
			</Button>
			<Button icon labelPosition='right' onClick={nextPage}>
				Next
				<Icon name='right arrow' />
			</Button>
		</Segment>
	);
}

export default PDF;
