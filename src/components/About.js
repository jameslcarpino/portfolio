import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import james from "./james.jpg";

export default function About() {
  return (
    <>
      <Card>
        <Modal.Header>
          <Card.Title>About James</Card.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={james} alt="james" rounded />
          <Card.Text>
            As you alreayd know, my name is James. Here are some quick things
            you may not know about me!
          </Card.Text>
          <Card.Text>I am a human.</Card.Text>
          <Card.Text>
            I am in love with learning anythign and everything I can
          </Card.Text>
          <Card.Text>
            I will believe any and every ghost story someone tells me.
          </Card.Text>
        </Modal.Body>
      </Card>
    </>
  );
}
