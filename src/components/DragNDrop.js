import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { FaMale } from "react-icons/fa";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GiTreasureMap } from "react-icons/gi";
import { RiArrowDownFill } from "react-icons/ri";
import { BiMailSend } from "react-icons/bi";

import About from "./About";
import Contact from "./Contact";
import Projects from "./Projects";
import Resumap from "./Resumap";

import Modal from "react-bootstrap/Modal";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

// import { useHistory } from "react-router-dom";

const iconArray = [
  { id: uuid(), content: <FaMale />, desc: "About", placement: "right" },

  {
    id: uuid(),
    content: <AiOutlineFundProjectionScreen />,
    desc: "Projects",
    placement: "right",
  },
  {
    id: uuid(),
    content: <GiTreasureMap />,
    desc: "Resumap",
    placement: "right",
  },
  // {
  //   id: uuid(),
  //   content: <FaRegFilePdf />,
  //   desc: "Resume",
  //   placement: "right",
  // },
  {
    id: uuid(),
    content: <BiMailSend />,
    desc: "Contact",
    placement: "right",
  },
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
  // const { push } = useHistory();
  const [columns, setColumns] = useState(columnsFromBackend);
  const [visible, setVisible] = useState({
    about: false,
    contact: false,
    project: false,
    resumap: false,
  });

  const showModal = (d) => {
    setTimeout(() => {
      if (d.desc === "About") {
        setVisible({
          ...visible,
          about: true,
        });
      } else if (d.desc === "Contact") {
        setVisible({
          ...visible,
          contact: true,
        });
      } else if (d.desc === "Resumap") {
        setVisible({
          ...visible,
          resumap: true,
        });
      } else if (d.desc === "Projects") {
        setVisible({
          ...visible,
          projects: true,
        });
      }
    }, 400);
  };
  // const handleOk = (e) => {
  //   setVisible(false);
  // };

  const handleCancel = (e) => {
    setVisible(false);
    setTimeout(() => {
      setColumns(columnsFromBackend);
    }, 250);
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
  };

  return (
    <div className="first-div-dndC">
      <div className="second-div-dndC">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <>
                <div key={columnId} className="third-div-dndC">
                  <div style={{ margin: 0 }}>
                    <h2 style={{ fontSize: "1.2rem", color: "#212529" }}>
                      {column.name}
                    </h2>
                    <h2 style={{ textAlign: "center", color: "#212529" }}>
                      {column.icon}
                    </h2>
                  </div>
                  <div className="droppable-container">
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <>
                            {/* <div style={{ margin: 0 }}></div> */}
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="droppers"
                              // onMouseUp={handleLaunchModal}
                              style={{
                                boxShadow: snapshot.isDraggingOver
                                  ? "5px 5px 5px 2px #808782"
                                  : null,
                                display: "flex",
                                flexDirection: "column",
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
                                          <OverlayTrigger
                                            key={item.placement}
                                            placement={item.placement}
                                            overlay={
                                              <Tooltip
                                                id={`tooltip-${item.placement}`}
                                              >
                                                {item.desc}
                                              </Tooltip>
                                            }
                                          >
                                            <div className="about">
                                              {item.content}
                                              <p
                                                style={{
                                                  fontSize: "10px",
                                                  marginTop: "1px",
                                                }}
                                              >
                                                {/* {item.desc}  considering putting back in for mobile view*/}
                                              </p>
                                            </div>
                                          </OverlayTrigger>
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
      </div>

      <Modal
        title="Basic Modal"
        show={visible.about}
        onHide={handleCancel}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <About />
      </Modal>
      <Modal
        title="Basic Modal"
        show={visible.contact}
        onHide={handleCancel}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Contact />
      </Modal>
      <Modal
        title="Basic Modal"
        show={visible.project}
        onHide={handleCancel}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Projects />
      </Modal>
      <Modal
        title="Basic Modal"
        show={visible.resumap}
        onHide={handleCancel}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Resumap />
      </Modal>
    </div>
  );
}

export default DragNDrop;
