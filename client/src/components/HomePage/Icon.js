import React from "react";
import { withRouter } from "react-router-dom";
import logo from "../../assets/icon.svg";

function Icon() {
  return (
    <div style={{ marginTop: "5%" }}>
      <img
        src={logo}
        alt="blackboard"
        style={{
          height: "30%",
          width: "30%",
          float: "left"
        }}
      />
      <p
        style={{
          float: "right",
          fontSize: "250%",
          marginRight: "3%",
          marginTop: "10%"
        }}
      >
        Welcome to <span style={{ color: "#ff9b21" }}>College Dashboard</span>,
        a new Interactive Web App{" "}
      </p>
      <p style={{ float: "right", fontSize: "250%", marginRight: "9%" }}>
        that lets you check your attendance, marks and CGPA
      </p>
    </div>
  );
}

export default withRouter(Icon);
