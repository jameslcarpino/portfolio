import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { FaMale, FaEnvelopeOpenText } from "react-icons/fa";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GiTreasureMap, GiArcheryTarget } from "react-icons/gi";

import { Link, Route, useHistory } from "react-router-dom";
import About from "../components/About";

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
    name: "Drop Icon Here To Learn More",
    icon: <GiArcheryTarget />,
    icons: [],
  },
};

function Test() {
  const { push } = useHistory();
  const [columns, setColumns] = useState(columnsFromBackend);

  const handleLaunch = (d) => {
    console.log("getting the information from destIcons:", d.desc);
    console.log(("getting destIcons id:", d.id));
    if (d.desc === "About") {
      push("/about");
    } else if (d.desc === "Contact") {
      push("/contact");
    } else if (d.desc === "Resumap") {
      push("/resumap");
    } else if (d.desc === "Projects") {
      push("/projects");
    }
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

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div key={columnId}>
              <div style={{ margin: 8, textAlign: "center" }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <>
                        <div style={{ margin: 0 }}>
                          <h2>{column.name}</h2>
                          <h2>{column.icon}</h2>
                        </div>
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="containers"
                          // onMouseUp={handleLaunchModal}
                          style={{
                            background: "#f5f5f5",

                            padding: 4,

                            height: "49vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
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
                                        // margin: "0 0 8px 0",
                                        fontSize: "2.5rem",
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
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Test;
