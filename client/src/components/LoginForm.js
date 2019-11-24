// TODO: Implement wrong username/password error message

import React, { useState, useEffect } from "react";
import "./styles/forms.css";
import {
  Button,
  Form,
  Grid,
  Segment,
  Header,
  Message
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import useForm from "../customHooks/useForm";

const ENDPOINT =
  "https://college-dashboard-backend.herokuapp.com/account/login";
// const ENDPOINT = "http://localhost:4000/account/login";

function validate(data) {
  let errors = {};

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email))
    errors.correctEmail = "Enter a valid email address";

  if (!data.email || !data.password)
    errors.allFilled = "Make sure you fill in all the fields";

  return errors;
}

function LoginForm(props) {
  const [load, setLoad] = useState(false);
  const [handleSubmit, handleChange, , , submitResponse, errors] = useForm(
    ENDPOINT,
    validate
  );
  document.title = "CollegeDashboard | Login";

  if (submitResponse === true) props.history.push("/student/dashboard");
  useEffect(() => {
    if (Object.entries(errors).length > 0) setLoad(false);
  }, [errors]);

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center" className="zoomIn" style={{color:'#008080'}}>
          Hello, there. Login to your account
        </Header>
        <Form error size="large" onSubmit={handleSubmit}>
          <Segment raised inverted color="teal" secondary className="zoomIn">
            <Form.Input
              fluid
              onChange={handleChange}
              icon="address card"
              iconPosition="left"
              placeholder="Email"
              name="email"
              type="input"
              className="zoomIn"
            />
            <Form.Input
              fluid
              onChange={handleChange}
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              name="password"
              type="password"
              className="zoomIn"
            />
            <Button
              type="submit"
              className="zoomIn"
              loading={load}
              onClick={() => setLoad(true)}
            >
              Login
            </Button>
            <Button inverted as={Link} to="/signup" className="zoomIn">
              Sign Up
            </Button>
          </Segment>
          {Object.entries(errors).length > 0 && (
            <Message
              error
              header="Could Not Sign In"
              content="Email / Password is incorrect"
              size="small"
              className="zoomIn"
            />
          )}
          <Message className="zoomIn">
            Forgot your password?{" "}
            <Link to="/reset" className="zoomIn">
              Reset
            </Link>
          </Message>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default withRouter(LoginForm);
