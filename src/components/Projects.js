import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import ModalBody from "react-bootstrap/ModalBody";
import { projectData } from "./projectData";

export default function Projects() {
  return (
    <>
      {projectData.map((item) => (
        <ModalBody>
          <CardGroup>
            <Card style={{ textAlign: "center" }}>
              <Image
                size="sm"
                variant="top"
                fluid
                src={item.image}
                style={{ textAlign: "center" }}
              />
              <Card.Body style={{ textAlign: "justify" }}>
                <div>
                  <Card.Title style={{ fontSize: "2.1rem" }}>
                    {item.name}
                  </Card.Title>
                  <Card.Text>
                    <ul>
                      <p>{item.description}</p>
                    </ul>
                  </Card.Text>
                  <Card.Title>CONTRIBUTIONS</Card.Title>
                  <div style={{ textAlign: "justify" }}>
                    {item.roles.map((tasks) => (
                      <Card.Text style={{ fontSize: "14px" }}>
                        <ul>{tasks.role}</ul>
                      </Card.Text>
                    ))}
                  </div>
                  <Card.Title>TECHNOLOGY USED</Card.Title>

                  <Card.Text>
                    <ul>
                      {" "}
                      {item.technology.frontend.length > 0 ? (
                        <>
                          <Card.Subtitle style={{ fontStyle: "italic" }}>
                            Front End
                          </Card.Subtitle>
                          {item.technology.frontend}
                        </>
                      ) : null}
                    </ul>
                  </Card.Text>

                  <Card.Text>
                    <ul>
                      {item.technology.backend.length > 0 ? (
                        <>
                          <Card.Subtitle style={{ fontStyle: "italic" }}>
                            Back End
                          </Card.Subtitle>
                          {item.technology.backend}
                        </>
                      ) : null}
                    </ul>
                  </Card.Text>
                </div>

                <Button
                  variant="dark"
                  style={{ marginRight: "2%" }}
                  onClick={() => {
                    window.location.href = `${item.website}`;
                  }}
                >
                  View Project
                </Button>
                <Button
                  variant="dark"
                  onClick={() => {
                    window.open(`${item.github}`);
                  }}
                >
                  View Github
                </Button>
              </Card.Body>
            </Card>
          </CardGroup>
        </ModalBody>
      ))}
    </>
  );
}
