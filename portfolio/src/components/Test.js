import React from "react";
import styled from "styled-components";
import Draggable from "./Draggable";

export default function Test() {
  return (
    <Container>
      <Draggable>
        <Rect />
      </Draggable>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const Rect = styled.div`
  width: 200px;
  height: 200px;
  background: red;
`;
