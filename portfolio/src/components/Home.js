import React from "react";
import Board from "./Boards_Cards/Boards";
import Card from "./Boards_Cards/Card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaMale, FaEnvelopeOpenText } from "react-icons/fa";
import { GiTreasureMap } from "react-icons/gi";
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
      <div className="icon-wrapper">
        <FaMale
          //   icon={faMale}
          style={{ fontSize: "3rem" }}
          //About Icon
        />

        <FaEnvelopeOpenText
          //   icon={faEnvelopeOpenText}
          style={{ fontSize: "3rem" }}
          //contact Icon
        />
        <AiOutlineFundProjectionScreen
          style={{ fontSize: "3.5rem" }}
          //projects
        />
        <GiTreasureMap style={{ fontSize: "3rem" }} />
      </div>
    </>
  );
}
