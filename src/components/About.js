import React, { useState } from "react";
// import { Modal, Button } from "antd";

import { useModal, Modal, Flex, Button, Text } from "sriracha-ui";
import styled from "styled-components";
export default function About() {
  return (
    <>
      {/* <Button onClick={toggle}>Toggle</Button>
      <Modal isActive={isActive} toggle={toggle}>
        <Flex w="40rem" h="40rem" drape>
          <Text>I'm a modal, yo!</Text>
          <Button autoFocus onClick={() => alert("Thanks for clicking me!")}>
            Click me!
          </Button>
          <Button onClick={toggle}>Close</Button>
        </Flex>
      </Modal> */}
      <Title>TEST</Title>
    </>
  );
}
const Title = styled.h2`
  font-size: 200px;
`;
