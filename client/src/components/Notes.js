import React from "react";
import { Header, Button, Grid, Form, Segment } from "semantic-ui-react";

function Notes({ studentData }) {
  const { usn } = studentData;

  return (
    <div>
      {/* <Header
        size="huge"
        textAlign="center"
        style={{ color: "#008080", marginTop: "3%" }}
      >
        Notes
      </Header> */}

      {/* <Button as="label" htmlFor="file" type="button">
            Upload Notes
          </Button>
          <input
            type="file"
            id="file"
            accept=".pdf"
            style={{ display: "hidden" }}
            //onChange={this.onChange}
          />
          <Button as="label" htmlFor="file" type="button">
            Get Notes
          </Button> */}
      <Segment
        raised
        inverted
        color="teal"
        secondary
        className="zoomIn"
        styl={{}}
      >
        <Form>
          <Form.Input
            label="Enter notes to upload"
            type="file"
            id="file"
            accept=".pdf"
            // style={{ display: "hidden" }}
            //onChange={this.onChange}
          />
        </Form>
      </Segment>
    </div>
  );
}

export default Notes;
