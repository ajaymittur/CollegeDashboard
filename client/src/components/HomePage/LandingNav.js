import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";

function LandingNav() {
  return (
    <div>
      <Menu fixed="top" borderless>
        <Menu.Item style={{ width: "20%", marginLeft: "83%" }}>
          <Link to="/signup">
            <Button size="large">Sign Up</Button>
          </Link>
          <Link to="/login">
            <Button size="large" color="orange">
              Log in
            </Button>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default withRouter(LandingNav);
