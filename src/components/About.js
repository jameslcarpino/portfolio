import React from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Image from "react-bootstrap/Image";

import FigureImage from "react-bootstrap/FigureImage";
import ListGroup from "react-bootstrap/ListGroup";
import james from "./james.jpg";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function About() {
  return (
    <>
      <Jumbotron style={{ width: "100%" }}>
        <Card.Header style={{ textAlign: "center" }}>About</Card.Header>
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
                <Card>
                  <div className="about-info-card">
                    <div>
                      <Card.Text>Hello again!</Card.Text>
                      <Card.Text>
                        As mentioned before, my name is James Carpino.
                      </Card.Text>
                      <Card.Text>I'm a full stack web developer.</Card.Text>
                      <Card.Text>
                        Formerly I was a filmmaker, photographer, baker, and
                        wilderness first responder.
                      </Card.Text>

                      <Card.Title style={{ textAlign: "center" }}>
                        Puzzles and Passions
                      </Card.Title>
                      <Card.Text>
                        What started as a passion for solving puzzles quickly
                        transitioned into solving problems through the use of
                        code. While teaching myself basic python I stumbled upon
                        the Lambda School, and immediately knew that if I was
                        serious about learning to code I was going to have to
                        dive in head first. So that's what I did.
                      </Card.Text>
                      <Card.Text>
                        Now I spend my time coming up with new problems to solve
                        while also indulging my desire to constantly be learning
                        new technologies, languages, and of course solving
                        puzzles.
                      </Card.Text>
                    </div>

                    <div className="about-image">
                      <Image height="350vh" src={james} alt="james" rounded />
                    </div>
                  </div>
                  <p style={{ fontSize: "11px" }}>
                    {" "}
                    If you havne't already and you're interested in the more
                    deep dive into me and how I ended up here I recommend
                    checking out my{" "}
                    <a ref="jameslcarpino.github.io" target="_blank">
                      resumap
                    </a>
                    !
                  </p>
                </Card>

                <Card.Title
                  style={{
                    textAlign: "center",
                    textDecoration: "underline",
                    fontSize: "2.1rem",
                  }}
                >
                  SKILLS
                </Card.Title>
                <div>
                  <CardDeck>
                    <Card style={{ textAlign: "center" }}>
                      <Card.Body>
                        <Card.Subtitle>Languages</Card.Subtitle>
                        <Card.Text>
                          JavaScript | HTML | CSS/SASS/LESS | SQL | PYTHON
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </CardDeck>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Card>
      </Jumbotron>
    </>
  );
}
