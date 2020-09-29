import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { FaMale, FaEnvelopeOpenText } from "react-icons/fa";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GiTreasureMap } from "react-icons/gi";

const iconsFromBackend = [
  { id: uuid(), content: <FaMale /> },
  { id: uuid(), content: <FaEnvelopeOpenText /> },
  { id: uuid(), content: <AiOutlineFundProjectionScreen /> },
  { id: uuid(), content: <GiTreasureMap /> },
];

const columnsFromBackend = {
  [uuid()]: {
    // name: null,
    icons: iconsFromBackend,
  },
  [uuid()]: {
    icons: [],
  },
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

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div key={columnId}>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "green"
                            : "#f5f5f5",
                          padding: 4,
                          border: "1px black solid",
                          display: "flex",
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
                                      fontSize: "50px",
                                      textAlign: "center",
                                      color: "black",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
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

export default App;
