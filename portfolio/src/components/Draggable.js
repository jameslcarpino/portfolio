import React, { useState, useMemo, useCallBack, useEffect } from "react";

const POSITION = { x: 0, y: 0 };
const Draggable = ({ children }) => {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  });
  const styles = useMemo(
    () => ({
      cursor: state.isDragging ? "-webkit-grabbing" : "-webkit-grab",
      transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
      transition: state.isDragging ? "none" : "transform 500mx",
      zIndex: state.isDragging ? 2 : 1,
      position: state.isDragging ? "aboslute" : "relative",
    }),
    [state.isDragging, state.translation]
  );

  const handleMouseDown = useCallBack(({ clientX, clientY }) => {
    setState((state) => ({
      ...state,
      isDragging: true,
      origin: { x: clientX, y: clientY },
    }));
  }, []);

  const handleMouseMove = useCallBack(() => {
    const translation = {
      x: clientX - state.origin.x,
      y: clientY - state.origin.y,
    };
    setState((state) => ({
      ...state,
      translation,
    }));
  }, [state.origin]);

  const handleMouseUp = useCallBack(() => {
    setState((state) => ({
      ...state,
      isDragging: false,
    }));
  }, []);

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemup", handleMouseUp);
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div style={styles} onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};

export default Draggable;
