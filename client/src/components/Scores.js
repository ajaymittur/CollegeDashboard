import React from "react";
import { Header } from "semantic-ui-react";
import { VictoryPie, VictoryChart, VictoryLine, VictoryTheme } from "victory";

function Scores({ studentData }) {
  const { marks } = studentData;

  let chartData = [];
  let i = 0;
  for (let mark in marks) {
    chartData.push({ y: Object.values(marks)[i], x: mark });
    ++i;
  }

  return (
    <div>
      <Header
        as="h1"
        textAlign="center"
        style={{ color: "#008080", marginTop: "3%" }}
      >
        Marks
      </Header>
      <div
        style={{
          width: "50%",
          float: "left",
          marginTop: "1%"
        }}
      >
        <VictoryPie
          data={chartData}
          colorScale="qualitative"
          height={300}
          style={{ labels: { fontSize: "17px" } }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: "data",
                      mutation: ({ style }) => {
                        return style.fill === "#00AEAE"
                          ? null
                          : { style: { fill: "#00AEAE" } };
                      }
                    },
                    {
                      target: "labels"
                    }
                  ];
                }
              }
            }
          ]}
        />
      </div>
      <div
        style={{
          width: "50%",
          float: "right",
          marginTop: "1%"
        }}
      >
        <VictoryChart
          theme={VictoryTheme.material}
          domain={{ y: [0, 100] }}
          height={300}
          width={400}
        >
          <VictoryLine
            style={{ data: { fill: "#00AEAE" } }}
            alignment="start"
            data={chartData}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "data",
                        mutation: props => {
                          const fill = props.style && props.style.fill;
                          return fill === "black"
                            ? null
                            : { style: { fill: "black" } };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          />
        </VictoryChart>
      </div>
    </div>
  );
}

export default Scores;
