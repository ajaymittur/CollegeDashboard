import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

function LandingNav() {
	return (
		<Menu>
			<Menu.Menu position='right'>
				<Menu.Item>
					<Button size='large' as={Link} to='/signup'>
						Sign Up
					</Button>
				</Menu.Item>

				<Menu.Item>
					<Button size='large' color='teal' as={Link} to='/login'>
						Log in
					</Button>
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
}

export default LandingNav;
