import React from "react";
import logo from "../../assets/mainstats.svg";
import logo1 from "../../assets/statistics.svg";
import logo2 from "../../assets/stats2.svg";
import "../styles/type.css";
import { Image, Container } from "semantic-ui-react";
import Para from "./Para";

function Details() {
  return (
    <Container
      textAlign="center"
      text
      style={{ maxWidth: "60%", overflow: "auto" }}
    >
      <Image src={logo} size="small" floated="left" verticalAlign="middle" />
      <span className="txt">
        Welcome to <span style={{ color: "#008080" }}>CoDash</span>, a new
        intuitive and interactive Web App that lets you analyze your attendance,
        marks and CGPA!
      </span>

      <Para
        float="right"
        logo={logo1}
        text="Track your progress through the semester and compare your performance with that of others with this interactive app!"
      />

      <Para
        float="left"
        logo={logo2}
        text="Sign Up now to check out our amazing and awe-inspiring Data Visualization and Manipulation!"
      />
    </Container>
  );
}

export default Details;
