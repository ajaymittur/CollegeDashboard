import React, { useState, useEffect } from "react";
import "../styles/type.css";

function Type() {
  return (
    <div style={{ marginTop: "10%" }}>
      <span style={{ marginLeft: "35%" }} className="nun">
        We{" "}
      </span>
      <span
        className="typer"
        dataperiod="500"
        datarotate='[ "Educate.", "Emphasise.", "Excel."]'
      ></span>
    </div>
  );
}

export default Type;
