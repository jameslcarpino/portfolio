import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { FaMale, FaEnvelopeOpenText } from "react-icons/fa";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GiTreasureMap } from "react-icons/gi";
import { RiArrowDownFill } from "react-icons/ri";
//import { Modal } from "antd";
import About from "./About";
import Contact from "./Contact";
import Modal from "react-bootstrap/Modal";

// import { useModal, Modal, Card, Flex, Button, Text } from "sriracha-ui";

import { useHistory } from "react-router-dom";

const iconArray = [
  { id: uuid(), content: <FaMale />, desc: "About" },
  { id: uuid(), content: <FaEnvelopeOpenText />, desc: "Contact" },
  { id: uuid(), content: <AiOutlineFundProjectionScreen />, desc: "Projects" },
  { id: uuid(), content: <GiTreasureMap />, desc: "Resumap" },
];

const columnsFromBackend = {
  [uuid()]: {
    icons: iconArray,
    dropped: false,
  },
  [uuid()]: {
    icon: <RiArrowDownFill />,
    icons: [],
    name: "Drop an icon here to learn more!",
  },
};

function DragNDrop() {
  const { push } = useHistory();
  const [columns, setColumns] = useState(columnsFromBackend);
  // const { isModal, toggleModal } = useModal();
  // const { isModal: isContact, toggleModal: toggleContact } = useModal();
  // const [isActive, toggle] = useModal();
  const [visible, setVisible] = useState({
    about: false,
    contact: false,
    project: false,
    resumap: false,
  });

  const showModal = (d) => {
    if (d.desc === "About") {
      setVisible({
        ...visible,
        about: true,
      });
    } else if (d.desc === "Contact") {
      setVisible({
        ...visible,
        contact: true,
        about: false,
      });
    }
  };
  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
    setColumns(columnsFromBackend);
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceicons = [...sourceColumn.icons];
      const desticons = [...destColumn.icons];
      const [removed] = sourceicons.splice(source.index, 1);
      desticons.splice(destination.index, 0, removed);
      handleLaunch(...desticons);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          icons: sourceicons,
        },
        [destination.droppableId]: {
          ...destColumn,
          icons: desticons,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedicons = [...column.icons];
      const [removed] = copiedicons.splice(source.index, 1);
      copiedicons.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          icons: copiedicons,
        },
      });
    }
  };

  const handleLaunch = (d) => {
    console.log("getting the information from destIcons:", d.desc);
    console.log(("getting destIcons id:", d.id));
    showModal(d);
    // if (d.desc === "About") {
    //   // setTimeout(() => {});
    //   // toggleModal();
    //   showModal(d);
    // } else if (d.desc === "Contact") {
    //   showModal(d);
    //   // toggleContact();
    // }
    // } else if (d.desc === "Resumap") {
    //   push("/resumap");
    // } else if (d.desc === "Projects") {
    //   push("/projects");
    // }
  };

  return (
    <div className="droppableWrapper">
      {/* <h2 style={{ fontSize: "1.8rem", padding: "0px" }}>
        Want to learn more? Drop an Icon here
      </h2> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <>
                <div key={columnId}>
                  <div style={{ margin: 0 }}>
                    <h2 style={{ fontSize: "1.2rem" }}>{column.name}</h2>
                    <h2 style={{ textAlign: "center" }}>{column.icon}</h2>
                  </div>
                  <div
                    style={{
                      marginRight: 47,
                      marginLeft: "-32px",
                      textAlign: "center",
                    }}
                  >
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <>
                            {/* <div style={{ margin: 0 }}></div> */}
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="containers"
                              // onMouseUp={handleLaunchModal}
                              style={{
                                background: "#f5f5f5",
                                // background: snapshot.isDraggingOver
                                //   ? "#F5f5F5"
                                //   : "#f5f6f5",
                                // border: snapshot.isDraggingOver
                                //   ? "2px black solid"
                                //   : "black",
                                boxShadow: snapshot.isDraggingOver
                                  ? "5px 5px 5px 2px #808782"
                                  : null,
                                padding: 10,
                                display: "flex",
                                flexDirection: "column",

                                // justifyContent: "space-evenly",
                              }}
                            >
                              {column.icons.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: "none",
                                            textAlign: "center",
                                            color: "black",
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          <div className="about">
                                            {item.content}
                                            <p
                                              style={{
                                                fontSize: "10px",
                                                marginTop: "1px",
                                              }}
                                            >
                                              {item.desc}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          </>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              </>
            );
          })}
        </DragDropContext>

        {/* <Modal isActive={isContact} toggleModal={toggleContact}>
        <Flex w="40rem" h="40rem" drape>
          <Contact />
        </Flex>
      </Modal> */}
      </div>
      {/* {visible.about === true ? ( */}
      <Modal
        title="Basic Modal"
        show={visible.about}
        //onOk={handleOk}
        onHide={handleCancel}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <About />
      </Modal>
      <Modal
        title="Basic Modal"
        show={visible.contact}
        // onOk={handleOk}
        onHide={handleCancel}
        style={{ width: "50%" }}
      >
        <p> Contact test</p>
      </Modal>
    </div>
  );
}

export default DragNDrop;
