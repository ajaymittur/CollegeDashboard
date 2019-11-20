import React from "react";
import { withRouter } from "react-router-dom";
import LandingNav from "./LandingNav";
import Type from "./Type";
import Icon from "./Icon";

function LandingPage() {
  return (
    <div>
      <LandingNav />
      <Type />
      <Icon />
    </div>
  );
}

export default withRouter(LandingPage);
