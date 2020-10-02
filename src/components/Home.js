import React from "react";
import DragNDrop from "./DragNDrop";
// import { Card } from "sriracha-ui";
//import styled from "styled-components";
import Projects from "./Projects";

export default function Home() {
  return (
    <div>
      <div className="nav-bar" style={{ textAlign: "right" }}>
        <p>placeholder text for nav bar component</p>
      </div>
      <div className="home-container">
        <div className="text-container">
          <div>
            <h3 className="intro-text">Hello there!</h3>
            <h3 className="intro-text">My name</h3>
            <h3 className="intro-text">Is James</h3>
          </div>
          <div>
            <p className="intro-p"> & I'm a full stack web developer.</p>
          </div>
        </div>
        <div>
          <DragNDrop className="icon-wrapper"></DragNDrop>
        </div>

        {/* <Card color="red5">Hello World</Card> */}
      </div>
    </div>
  );
}
