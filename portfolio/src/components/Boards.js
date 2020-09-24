import React from "react";

export default function Boards(props) {
  const drop = (e) => {
    e.preventDefault();
    const item_id = e.dataTransfer.getData("item_id");

    const drop = document.getElementById(item_id);
    drop.style.display = "block";

    e.target.appendChild(drop);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div
      id={props.id}
      onDrop={drop}
      onDragOver={dragOver}
      className={props.className}
    >
      {props.children}
    </div>
  );
}
