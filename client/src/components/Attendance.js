import React from "react";
import { Header, Progress, Grid } from "semantic-ui-react";

function Attendance({ studentData }) {
  const { attendance } = studentData;

  const getProgBar = key => {
    let isSuccess = false,
      isWarning = false,
      isError = false;
    if (key[1] >= 75 && key[1] < 85) isWarning = true;
    else if (key[1] >= 85) isSuccess = true;
    else isError = true;
    return (
      <Grid.Column style={{ maxWidth: 450 }}>
        <Progress
          percent={key[1]}
          label={key[0]}
          progress="percent"
          size="large"
          indicating
          success={isSuccess}
          warning={isWarning}
          error={isError}
        />
      </Grid.Column>
    );
  };

  return (
    <div>
      <Header
        size="huge"
        textAlign="center"
        color="orange"
        style={{ marginTop: "5%", fontSize: "400%" }}
      >
        Attendance
      </Header>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Row columns="2">
          {Object.entries(attendance).map(getProgBar)}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Attendance;
