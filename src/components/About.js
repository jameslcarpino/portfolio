import React from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import FigureImage from "react-bootstrap/FigureImage";
import james from "./james.jpg";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function About() {
  return (
    <>
      <Jumbotron>
        <h1>About</h1>
        <Card>
          <Modal.Body>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "space-between",
              }}
            >
              <div>
                <Card.Text>
                  As you alreayd know, my name is James. Here are some quick
                  things you may not know about me!
                </Card.Text>
                <Card.Text>I am a human.</Card.Text>
                <Card.Text>
                  I am in love with learning anythign and everything I can
                </Card.Text>
                <Card.Text>
                  I will believe any and every ghost story someone tells me.
                </Card.Text>
              </div>
              <Image height="350vh" src={james} alt="james" rounded />
            </div>
          </Modal.Body>
        </Card>
      </Jumbotron>
    </>
  );
}
