import React from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import ModalBody from "react-bootstrap/ModalBody";
import { projectData } from "./projectData";

export default function Projects(props) {
  let { handleCancel } = props;
  return (
    <>
      {projectData.map((item) => (
        <ModalBody>
          <Card style={{ textAlign: "center" }}>
            <Image size="sm" variant="top" fluid src={item.image} />
            <Card.Body>
              <div>
                <Card.Subtitle>PROJECT NAME</Card.Subtitle>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Subtitle>CONTRIBUTIONS</Card.Subtitle>
                {item.roles.map((tasks) => (
                  <Card.Text>{tasks.role}</Card.Text>
                ))}
                <Card.Subtitle>TECHNOLOGY USED</Card.Subtitle>
                <Card.Text>
                  {item.technology.frontend.length > 0
                    ? `Front End: ${item.technology.frontend}`
                    : null}
                </Card.Text>
                <Card.Text>
                  {item.technology.backend.length > 0
                    ? `Back End: ${item.technology.backend}`
                    : null}
                </Card.Text>
              </div>

              <Button variant="dark">View Project</Button>
              <Button variant="dark">View Github</Button>
            </Card.Body>
          </Card>
        </ModalBody>
      ))}
    </>
  );
}
