import React from "react";
import Board from "./Boards_Cards/Boards";
import Card from "./Boards_Cards/Card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
export default function Home() {
  return (
    <>
      <div className="nav-bar" style={{ textAlign: "right" }}>
        <p>placeholder text for nav bar component</p>
      </div>
      <div className="home-container">
        <div>
          <h3 className="intro-text">Hello there!</h3>
          <h3 className="intro-text">My name</h3>
          <h3 className="intro-text">Is James</h3>
        </div>
        <div>
          <p className="intro-p">I'm a full stack web developer.</p>
          <p className="intro-learn">Want to learn more?</p>
          <p className="intro-learn">Drag an icon into the rabbit hole!</p>
        </div>
      </div>
    </>
  );
}
