import React from "react";
import Board from "./Boards";
import Card from "./Card";
export default function Home() {
  return (
    <div className="flexbox">
      <div>
        <h2> Hi!</h2>
        <h2> My name is James Carpino</h2>
        <p>I'm a full stack web developer</p>
        <p>
          {" "}
          Want to learn more? Drop one of these icons into the rabbit hole.
        </p>
      </div>
      <div>
        <Board id="board-1" className="board">
          <Card id="card-1" classname="card" draggable="true">
            <p>TEST DRAG DROP</p>
          </Card>
        </Board>

        <Board id="board-2" className="board">
          <Card id="card-2" className="card" draggable="true">
            <p>TEST 2 CARD</p>
          </Card>
        </Board>
      </div>
    </div>
  );
}
