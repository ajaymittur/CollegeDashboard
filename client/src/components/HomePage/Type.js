import React, { useState } from "react";
import Typist from "react-typist";
import "../styles/type.css";
import { Container } from "semantic-ui-react";

function Type() {
	const [cursor, setCursor] = useState({
		show: false,
		blink: true,
		element: "|",
		hideWhenDone: false,
		hideWhenDoneDelay: 1000
	});

	return (
		<Container textAlign='center' style={{ marginTop: "10%", marginBottom: "10%" }}>
			<Typist cursor={cursor}>
				<span style={{}} className='nun'>
					{" "}
					We <span style={{ color: "teal" }}>Educate.</span>
				</span>
				<Typist.Backspace count={8} delay={500} />
				<span className='typer'> Emphasise.</span>
				<Typist.Backspace count={11} delay={500} />
				<span className='typer'> Excel.</span>
			</Typist>
		</Container>
	);
}

export default Type;
