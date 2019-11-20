import React from "react";
import { withRouter } from "react-router-dom";
import logo from "../../assets/icon.svg";
import '../styles/type.css'

function Icon() {
  return (
    <div style={{ marginTop: "5%" }}>
      <img
        src={logo}
        alt="blackboard"
        style={{
          height: "25%",
          width: "25%",
          float: "left"
        }}
      />
      <p className='txt'
        style={{
          float: "right",
          fontSize: "250%",
          marginRight: "3%",
          marginTop: "9%"
        }}
      >
        Welcome to <span style={{ color: "#ff9b21" }}>College Dashboard</span>,
        a new Interactive Web App{" "}
      </p>
      <p className='txt' style={{ float: "right", fontSize: "250%", marginRight: "9%", marginTop: '-2%' }}>
        that lets you check your attendance, marks and CGPA!
      </p>
    </div>
  );
}

export default withRouter(Icon);
