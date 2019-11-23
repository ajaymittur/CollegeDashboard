import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

function LandingNav() {
	return (
		// <div>
		// 	<Menu fixed='top' borderless>
		// 		<Menu.Item style={{ width: "20%", marginLeft: "83%" }}>
		// 			<Link to='/signup'>
		// 				<Button size='large'>Sign Up</Button>
		// 			</Link>
		// 			<Link to='/login'>
		// 				<Button size='large' color='orange'>
		// 					Log in
		// 				</Button>
		// 			</Link>
		// 		</Menu.Item>
		// 	</Menu>
		// </div>
		<Menu>
			<Menu.Menu position='right'>
				<Menu.Item>
					<Button size='large' as={Link} to='/signup'>
						Sign Up
					</Button>
				</Menu.Item>

				<Menu.Item>
					<Button size='large' color='orange' as={Link} to='/login'>
						Log in
					</Button>
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
}

export default LandingNav;
