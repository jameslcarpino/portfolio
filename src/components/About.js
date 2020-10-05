import React from "react";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Image from "react-bootstrap/Image";

import james from "./james.jpg";
import Jumbotron from "react-bootstrap/Jumbotron";
import {
  FaSquarespace,
  FaInstagram,
  FaGithubSquare,
  FaDev,
} from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
export default function About() {
  return (
    <Jumbotron style={{ width: "100%" }}>
      <Card.Header style={{ textAlign: "center" }}>About</Card.Header>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "space-between",
          width: "100%",
        }}
      >
        <div>
          <Card style={{ fontSize: "14px" }}>
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
                  transitioned into solving problems through the use of code.
                  While teaching myself basic python I stumbled upon the Lambda
                  School, and immediately knew that if I was serious about
                  learning to code I was going to have to dive in head first. So
                  that's what I did.
                </Card.Text>
                <Card.Text>
                  Now I spend my time coming up with new problems to solve while
                  also indulging my desire to constantly be learning new
                  technologies, languages, and of course solving puzzles.
                </Card.Text>
              </div>

              <div className="about-image">
                <Image height="350vh" src={james} alt="james" rounded />
              </div>
            </div>
            <p style={{ fontSize: "11px", textAlign: "center" }}>
              {" "}
              If you haven't already and you're interested in the deep dive into
              me and how I ended up here I recommend checking out my{" "}
              <a
                href="https://jameslcarpino.github.io"
                rel="noopener noreferrer"
                target="_blank"
              >
                resumap
              </a>
              !
            </p>
            <p style={{ fontSize: "11px", textAlign: "center" }}>
              Also, if you enjoy poetry and photography please{" "}
              <a
                href="https://indd.adobe.com/view/f6ae6009-d0ae-4e64-a16d-f5959665359b"
                target="_blank"
                rel="noopener noreferrer"
              >
                read the book I wrote!
              </a>{" "}
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
                  <Card.Text style={{ fontSize: "12px" }}>
                    JavaScript | HTML | CSS/SASS/LESS | SQL | Python(mostly for
                    algorithms)
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
            <CardDeck>
              <Card style={{ textAlign: "center" }}>
                <Card.Body>
                  <Card.Subtitle>Frameworks</Card.Subtitle>
                  <Card.Text style={{ fontSize: "12px" }}>
                    Redux | Node JS | Express | Context API
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
            <CardDeck>
              <Card style={{ textAlign: "center" }}>
                <Card.Body>
                  <Card.Subtitle>Libraries</Card.Subtitle>
                  <Card.Text style={{ fontSize: "12px" }}>
                    React JS | Mapbox GL | Knex JS | Axios | React Router Dom |
                    React Beautiful Drag and Drop | GreenSock
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
            <CardDeck>
              <Card style={{ textAlign: "center" }}>
                <Card.Body>
                  <Card.Subtitle>Tools</Card.Subtitle>
                  <Card.Text style={{ fontSize: "12px" }}>
                    Postman/Insomnia | Git & Github | Chrome devTools | Terminal
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
            <CardDeck>
              <Card style={{ textAlign: "center" }}>
                <Card.Body>
                  <Card.Subtitle>Things I'm currently learning</Card.Subtitle>
                  <Card.Text style={{ fontSize: "12px" }}>
                    TypeScript | C# | Swift | React Query | React Native |
                    Angular JS | Next JS | Vue JS
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>

            <CardDeck>
              <Card style={{ textAlign: "center" }}>
                <Card.Body>
                  <Card.Subtitle>Want to connect?</Card.Subtitle>
                  <div className="socials">
                    <Card.Text style={{ fontSize: "2.5rem" }}>
                      <a
                        href="https://github.com/jameslcarpino"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <FaGithubSquare />
                      </a>
                    </Card.Text>
                    <Card.Text style={{ fontSize: "2.5rem" }}>
                      <a
                        href="https://dev.to/jameslcarpino"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <FaDev />
                      </a>
                    </Card.Text>
                    <Card.Text style={{ fontSize: "2.5rem" }}>
                      <a
                        href="https://www.linkedin.com/in/jameslcarpino"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <AiFillLinkedin />
                      </a>
                    </Card.Text>
                    <Card.Text style={{ fontSize: "2.5rem" }}>
                      <a
                        href="https://www.instagram.com/pine_foot"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <FaInstagram></FaInstagram>
                      </a>
                    </Card.Text>
                    <Card.Text style={{ fontSize: "2.5rem" }}>
                      <a
                        href="https://jameslcarpino.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <FaSquarespace />
                      </a>
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </CardDeck>
          </div>
        </div>
      </div>
    </Jumbotron>
  );
}
