import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import axios from "axios";

function Navbar(props) {
	const { activeItem, setActiveItem } = props;

	const handleItemClick = (e, { name }) => {
		setActiveItem(name);
	};

	const logoutUser = async () => {
		const res = await axios.get("https://college-dashboard-backend.herokuapp.com//account/logout");
		console.log(res);
		if (res.data.isSuccess) props.history.push("/");
		else console.error("Couldn't logout user");
	};

	return (
		<Menu posiion='left'>
			<Menu.Item
				color='orange'
				name='Home'
				active={activeItem === "Home"}
				onClick={handleItemClick}
			/>
			<Menu.Item
				color='orange'
				name='Scores'
				active={activeItem === "Scores"}
				onClick={handleItemClick}
			/>
			<Menu.Item
				color='orange'
				name='Attendance'
				active={activeItem === "Attendance"}
				onClick={handleItemClick}
			/>

			<Menu.Menu position='right'>
				<Dropdown text={props.name} item>
					<Dropdown.Menu>
						<center>
							<Dropdown.Item
								image={{
									src: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
									avatar: false
								}}
							/>
						</center>
						<Dropdown.Divider />
						<Dropdown.Item icon='user' text='Account' onClick={() => setActiveItem("Account")} />
						<Dropdown.Item icon='log out' text='Logout' onClick={logoutUser} />
					</Dropdown.Menu>
				</Dropdown>
			</Menu.Menu>
		</Menu>
	);
}

export default withRouter(Navbar);
