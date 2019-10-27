import React, { useState, useEffect } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import Navbar from "./Navbar";
import Overview from "./Overview";
import UserInfoCard from "./UserInfoCard";
import axios from "axios";

function Dashboard() {
	const [studentData, setStudentData] = useState({});
	const [didFetchData, setDidFetchData] = useState(false);
	const [activeItem, setActiveItem] = useState("Home");

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get("http://localhost:4000/student/getData");
			setStudentData(res.data.userData);
			setDidFetchData(true);
		};

		fetchData();
	}, [didFetchData]);

	const setComponent = activeItem => {
		if (activeItem === "Home") return <Overview studentData={studentData} />;
		// to be implemented
		else if (activeItem === "Scores") return "Scores";
		// to be implemented
		else if (activeItem === "Attendance") return "Attendance";
		else if (activeItem === "Account") return <UserInfoCard studentData={studentData} />;
	};

	const component = setComponent(activeItem);

	if (didFetchData === false)
		return (
			<div>
				<Dimmer active>
					<Loader size='large'>Loading Data</Loader>
				</Dimmer>
			</div>
		);
	else
		return (
			<div>
				<Navbar name={studentData.fullname} activeItem={activeItem} setActiveItem={setActiveItem} />

				{component}
			</div>
		);
}

export default Dashboard;
