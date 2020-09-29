import React, { useState } from "react";
import Draggable from "./Draggable";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaMale, FaEnvelopeOpenText } from "react-icons/fa";
import { GiTreasureMap } from "react-icons/gi";
import styled from "styled-components";
import { range } from "lodash";

const MAX = 4;

export default function Home() {
  const items = range(MAX);
  const [state, setState] = useState({
    order: items,
    dragOrder: items,
    draggedIndex: null,
  });

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

        <TheDraggables className="drop-zone">
          {items.map((index) => {})}
        </TheDraggables>
      </div>

      <TheDraggables>
        <Draggable>
          <FaMale
            className="about"
            //About Icon
          />
        </Draggable>

        {/* <Draggable>
          <AiOutlineFundProjectionScreen
            style={{ fontSize: "3.5rem" }}
            className="projects"
            //projects
          />
        </Draggable>
        <Draggable>
        
          <FaEnvelopeOpenText
            className="contact"
            style={{ fontSize: "3rem" }}
            //contact Icon
          />
        </Draggable>
        <Draggable>
          <GiTreasureMap style={{ fontSize: "3rem" }} className="map" />
        </Draggable> */}
      </TheDraggables>
    </>
  );
}

const TheDraggables = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 1%;
`;

const DraggedIcon = styled.div``;

const TheDropZone = styled.div``;
