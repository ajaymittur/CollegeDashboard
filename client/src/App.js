import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ResetPassForm from "./components/ResetPassForm";
import SignUpForm from "./components/SignUpForm";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import Particles from "react-particles-js";

const particleParams = {
	particles: {
		number: {
			value: 140,
			density: {
				enable: false,
				value_area: 800
			}
		},
		color: {
			value: ["#FFA500"]
		},
		line_linked: {
			color: "#FFA500",
			opacity: 1
		}
	}
};

function App() {
	// const [windowHeight, setWindowHeight] = useState(document.body.scrollHeight);

	// window.addEventListener("resize", () => {
	// 	setWindowHeight(document.body.scrollHeight);
	// });

	return (
		<Router>
			<Particles params={particleParams} height={document.body.scrollHeight} />
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%"
				}}
			>
				<Switch>
					<Route path='/' exact>
						<LoginForm />
					</Route>
					<Route path='/reset'>
						<ResetPassForm />
					</Route>
					<Route path='/signup'>
						<SignUpForm />
					</Route>
					<Route path='/student/dashboard'>
						<Dashboard />
					</Route>
					<Route>
						<NotFound />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
