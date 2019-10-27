import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import "./Cards.css";

function Cards(props) {
  const [graph, setGraph] = useState({
    data: [
      { x: "Attendance", y: props.attendance },
      { x: "Marks", y: props.marks }
    ]
  });

  const { name, subject, attendance, marks, credits } = props;

  return (
    <div>
      <Card
        className="grow"
        color="orange"
        raised
        style={{ marginTop: "20%", maxWidth: "95%" }}
      >
        <VictoryChart domainPadding={100} domain={{ y: [0, 60] }}>
          <VictoryAxis tickValues={["Attendance", "Marks"]} />
          <VictoryAxis dependentAxis tickFormat={100} />
          <VictoryBar
            style={{ data: { fill: "#f5a153" } }}
            data={graph.data}
            barRatio={0.7}
            labels={({ datum }) => datum.y}
          />
        </VictoryChart>
        <Card.Content>
          <Card.Header>{`${subject}`}</Card.Header>
          <Card.Meta>
            <span>{`${credits} Credits`}</span>
          </Card.Meta>
          <Card.Description>
            {`${name} has ${attendance}% attendance and ${marks}/100 marks in ${subject}`}
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}

export default Cards;
