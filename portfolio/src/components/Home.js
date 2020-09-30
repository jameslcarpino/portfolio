import React from "react";
import Test from "./Test";
//import styled from "styled-components";

export default function Home() {
  return (
    <>
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
          <Test className="icon-wrapper"></Test>
        </div>
      </div>
    </>
  );
}
