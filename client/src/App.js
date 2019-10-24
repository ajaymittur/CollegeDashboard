import React from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import ResetPassForm from "./components/ResetPassForm"
import SignUpForm from "./components/SignUpForm"
import NotFound from "./components/NotFound"
import InfoCards from "./components/InfoCards"

function App() {
	return (
		<Router>
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
					{/*<Navbar />*/}
					<InfoCards />
				</Route>
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</Router>
	)
}

export default App
