import React from "react";
import { Menu, Button, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

function LandingNav() {
  return (
    <Menu>
      <Image
        src="https://img.icons8.com/office/40/000000/class.png"
        size="mini"
        style={{
          height: "40px",
          width: "40px",
          marginLeft: "0.5%",
          paddingTop: "0.5%"
        }}
      />

      <Menu.Menu position="right">
        <Menu.Item>
          <Button size="large" as={Link} to="/signup" animated="fade">
            <Button.Content visible>Sign Up</Button.Content>
            <Button.Content hidden>Join Us!</Button.Content>
          </Button>
        </Menu.Item>

        <Menu.Item>
          <Button size="large" color="teal" as={Link} to="/login" animated>
            <Button.Content visible>Login</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default LandingNav;
