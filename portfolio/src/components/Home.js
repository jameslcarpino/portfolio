import React, { useState } from "react";
import Board from "./Boards_Cards/Boards";
import Card from "./Boards_Cards/Card";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Draggable from "./Draggable";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaMale, FaEnvelopeOpenText } from "react-icons/fa";
import { GiTreasureMap } from "react-icons/gi";
import styled from "styled-components";
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

        <div className="drop-zone">DROP HERE</div>
      </div>
      <Icons>
        <FaMale
          className="about"

          //About Icon
        />
        <FaEnvelopeOpenText
          className="contact"
          style={{ fontSize: "3rem" }}
          //contact Icon
        />

        {/* <Draggable>
          <FaMale
            className="about"

            //About Icon
          />
        </Draggable> */}

        {/* <Draggable>
          <FaEnvelopeOpenText
            className="contact"
            style={{ fontSize: "3rem" }}
            //contact Icon
          />
        </Draggable>

        <Draggable>
          <AiOutlineFundProjectionScreen
            style={{ fontSize: "3.5rem" }}
            className="projects"
            //projects
          />
        </Draggable>

        <Draggable>
          <GiTreasureMap style={{ fontSize: "3rem" }} className="map" />
        </Draggable> */}
      </Icons>
    </>
  );
}

const Icons = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 1%;
`;
