import React from "react";
import Draggable from "react-draggable";
import CatSprite from "./CatSprite";

export default function PreviewArea({
  handlePlay,
  rotation,
  position,
  setPosition,
  handleReset,
  message,
  todo,
  handleOnDrag,
}) {
  return (
    <div className="w-full h-full p-2">
      <div className="flex items-center justify-center space-x-10 py-5">
        <div className="">
          <button
            onClick={handlePlay}
            className={`mt-4 p-2 ${
              todo.length !== 0 ? "bg-blue-500" : "bg-blue-300"
            }  text-white rounded`}
            disabled={todo.length !== 0 ? false : true}
          >
            Play
          </button>
        </div>
        <div className="">
          <button
            onClick={handleReset}
            className={`mt-4 p-2 ${
              todo.length !== 0 ? "bg-blue-500" : "bg-blue-300"
            }  text-white rounded`}
            disabled={todo.length !== 0 ? false : true}
          >
            Reset
          </button>
        </div>
      </div>
      <Draggable
        bounds=""
        defaultPosition={{ x: 0, y: 0 }}
        position={position}
        onStop={(e, data) => {
          setPosition({ x: data.x, y: data.y });
        }}
        onDrag={handleOnDrag}
      >
        <div
          className={`w-24 `}
          id="animate"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
            transition: "transform 1s",
            cursor: "move",
          }}
        >
          {message && <span className="text-black">{message}</span>}
          <CatSprite />
        </div>
      </Draggable>
    </div>
  );
}
