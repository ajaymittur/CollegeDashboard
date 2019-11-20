import React from "react";
import "../styles/type.css";
import { withRouter } from "react-router-dom";

function Type() {
  var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  };

  window.onload = function() {
    var elements = document.getElementsByClassName("typer");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("dataRotate");
      var period = elements[i].getAttribute("dataPeriod");
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typer > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };
  return (
    <div style={{ marginTop: "10%" }}>
      <span style={{ marginLeft: "35%" }} className="nun">
        We{" "}
      </span>
      <span
        className="typer"
        dataPeriod="500"
        dataRotate='[ "Educate.", "Emphasise.", "Excel."]'
      ></span>
    </div>
  );
}

export default withRouter(Type);
