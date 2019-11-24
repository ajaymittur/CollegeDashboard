import React from "react";
import { Image, Container } from "semantic-ui-react";

function Para(props) {
	return (
		<Container
			textAlign='center'
			text
			style={{ maxWidth: "60%", margin: "auto", overflow: "auto" }}
		>
			<Image src={props.logo} size='small' floated={props.float} verticalAlign='middle' />
			<span className='txt'>{props.text}</span>
		</Container>
	);
}

export default Para;
