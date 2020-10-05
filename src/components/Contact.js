import React from "react";
import ModalBody from "react-bootstrap/ModalBody";
import Card from "react-bootstrap/Card";
import { FaGithubSquare } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
export default function Contact() {
  return (
    <ModalBody>
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title>
          Want to work together? <br></br>Lets talk! <br></br>Shoot me an email,
          connect with me on Linkedin, follow me on github, or cast a bottle to
          the sea with a message inside and drift it over to me!
        </Card.Title>
        <Card.Title>
          Email:{" "}
          <a
            href="mailto:jameslcarpino@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            JamesLCarpino@gmail.com
          </a>
        </Card.Title>
        <Card.Title>
          LinkedIn:{" "}
          <a
            href="https://linkedin.com/in/jameslcarpino"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <AiFillLinkedin style={{ fontSize: "2rem" }} />
          </a>
        </Card.Title>
        <Card.Title>
          Github:{" "}
          <a
            href="https://github.com/jameslcarpino"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithubSquare style={{ fontSize: "2rem" }} />
          </a>
        </Card.Title>
      </Card.Body>
    </ModalBody>
  );
}
