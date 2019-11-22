import React, { useState, useEffect } from "react";
import { Dimmer } from "semantic-ui-react";
import Particles from "react-particles-js";
import Navbar from "./Navbar";
import Overview from "./Overview";
import Scores from "./Scores";
import Attendance from "./Attendance";
import UserInfoCard from "./UserInfoCard";
import NotFound from "./NotFound";
import axios from "axios";

// Check this
const particleParams = {
	fps_limit: 28,
	particles: {
		number: {
			value: 200,
			density: {
				enable: false
			}
		},
		line_linked: {
			enable: true,
			distance: 30,
			opacity: 0.4
		},
		move: {
			speed: 1
		},
		opacity: {
			anim: {
				enable: true,
				opacity_min: 0.05,
				speed: 2,
				sync: false
			},
			value: 0.4
		}
	},
	polygon: {
		enable: true,
		scale: 0.5,
		type: "inline",
		move: {
			radius: 10
		},
		url: "/deer.svg",
		inline: {
			arrangement: "equidistant"
		},
		draw: {
			enable: true,
			stroke: {
				color: "rgba(255, 255, 255, .2)"
			}
		}
	},
	retina_detect: false,
	interactivity: {
		events: {
			onhover: {
				enable: true,
				mode: "bubble"
			}
		},
		modes: {
			bubble: {
				size: 6,
				distance: 40
			}
		}
	}
};

function Dashboard() {
	const [studentData, setStudentData] = useState({});
	const [didFetchData, setDidFetchData] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [activeItem, setActiveItem] = useState("Home");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					"https://college-dashboard-backend.herokuapp.com/student/getData"
					// "http://localhost:4000/student/getData"
				);
				setStudentData(res.data.userData);
				setIsLoggedIn(res.data.isSuccess);
				setDidFetchData(true);
			} catch (err) {
				setIsLoggedIn(false);
			}
		};

		fetchData();
	}, [didFetchData]);

	const setComponent = activeItem => {
		if (activeItem === "Home") return <Overview studentData={studentData} />;
		else if (activeItem === "Scores") return <Scores studentData={studentData} />;
		else if (activeItem === "Attendance") return <Attendance studentData={studentData} />;
		else if (activeItem === "Account") return <UserInfoCard studentData={studentData} />;
	};

	const component = setComponent(activeItem);

	if (!didFetchData && isLoggedIn)
		return (
			<div>
				<Dimmer active>
					<Particles params={particleParams} height='100vh' />
				</Dimmer>
			</div>
		);
	else if (!isLoggedIn) {
		return <NotFound />;
	} else
		return (
			<div>
				<Navbar
					name={studentData.fullname}
					pic={studentData.profilepic}
					activeItem={activeItem}
					setActiveItem={setActiveItem}
				/>
				{component}
			</div>
		);
}

export default Dashboard;
