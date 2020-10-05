import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import resumap from "./resumap.png";

export default function Resumap() {
  let handleClick = (e) => {
    e.preventDefault();

    window.location.href = "https://jameslcarpino.github.io";
  };
  return (
    <Card style={{ textAlign: "center" }}>
      <Card.Img variant="top" src={resumap} style={{ height: "50vh" }} />
      <Card.Body>
        <Card.Title>What is a Resumap?</Card.Title>
        <Card.Text>
          A resumap is a simple vizulation using Mapbox to make a more
          interactive resume that also alows you to take a closer look at how I
          ended up where I am now.
        </Card.Text>
        <Button variant="dark" onClick={handleClick}>
          Visit the Map
        </Button>
      </Card.Body>
    </Card>
  );
}
