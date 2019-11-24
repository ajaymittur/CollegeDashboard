import React from "react";
import logo from "../../assets/icon.svg";
import "../styles/type.css";
import { Image, Container } from "semantic-ui-react";
import Para from "./Para";

function Details() {
	return (
		<Container
			textAlign='center'
			text
			style={{ maxWidth: "60%", margin: "auto", overflow: "auto" }}
		>
			<Image src={logo} size='small' floated='left' verticalAlign='middle' />
			<span className='txt'>
				Welcome to <span style={{ color: "#008080" }}>CoDash</span>, a new intuitive and interactive
				Web App that lets you analyze your attendance, marks and CGPA!
			</span>

			<Para
				float='right'
				logo={logo}
				text='Welcome to CoDash, a new intuitive and interactive Web App that lets you analyze your attendance, marks and CGPA!'
			/>

			<Para
				float='left'
				logo={logo}
				text='Welcome to CoDash, a new intuitive and interactive Web App that lets you analyze your attendance, marks and CGPA!'
			/>
		</Container>
	);
}

export default Details;
