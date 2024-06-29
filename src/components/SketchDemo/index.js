import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import MidArea from "../MidArea";
import PreviewArea from "../PreviewArea";
import Sidebar from "../Sidebar";

const initialItems = [
  { id: "item-1", content: "Move 10 steps", action: "move" },
  {
    id: "item-2",
    content: `Turn right 15 degrees`,
    action: "turnRight",
  },
  {
    id: "item-3",
    content: `Turn left 15 degrees`,
    action: "turnLeft",
  },
  { id: "item-4", content: "Move x by 50", action: "move-x" },
  { id: "item-5", content: "Move y by 50", action: "move-y" },
  { id: "item-6", content: "Rotate 360 degrees", action: "rotate360" },
  { id: "item-7", content: "Go to (0, 0)", action: "goTo" },
  { id: "item-8", content: "Move X-50 Y-50", action: "move-x-y-negative" },
  { id: "item-9", content: "Go to random position", action: "goToRandom" },
  { id: "item-10", content: "Say Hello", action: "sayHello" },
  { id: "item-11", content: "Repeat", action: "repeat" },
];

const SketchDemo = () => {
  const [items, setItems] = useState(initialItems);
  const [todo, setTodo] = useState([]);
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const updatedItems = Array.from(
        source.droppableId === "items" ? items : todo
      );
      const [reorderedItem] = updatedItems.splice(source.index, 1);
      updatedItems.splice(destination.index, 0, reorderedItem);

      if (source.droppableId === "items") {
        setItems(updatedItems);
      } else {
        setTodo(updatedItems);
      }
    } else {
      const sourceItems = Array.from(
        source.droppableId === "items" ? items : todo
      );
      const [movedItem] = sourceItems.splice(source.index, 1);

      const destItems = Array.from(
        destination.droppableId === "items" ? items : todo
      );
      destItems.splice(destination.index, 0, movedItem);

      if (source.droppableId === "items") {
        setItems(sourceItems);
        setTodo(destItems);
      } else {
        setItems(destItems);
        setTodo(sourceItems);
      }
    }
  };

  const handlePlay = async () => {
    let repeatCount = 1; // Number of times to repeat the todo list
    let currentTodo = [...todo]; // Current todo list
    while (repeatCount > 0) {
      for (const item of currentTodo) {
        const { action, content } = item;
        await performAnimation({ action, content });
        if (item.action === "repeat") {
          repeatCount++;
          currentTodo = currentTodo.filter((i) => i.action !== "repeat");
        }
      }
      repeatCount--;
    }
  };

  const handleReset = () => {
    setItems(
      [...todo, ...items].sort((a, b) => {
        const idA = parseInt(a.id.split("-")[1]);
        const idB = parseInt(b.id.split("-")[1]);
        return idA - idB;
      })
    );
    setTodo([]);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  const performAnimation = ({ action, content }) => {
    return new Promise((resolve) => {
      switch (action) {
        case "move":
          setPosition((prev) => ({ ...prev, x: prev.x + 100 }));
          break;
        case "turnRight":
          setRotation((prev) => prev + 15);
          break;
        case "turnLeft":
          setRotation((prev) => prev - 15);
          break;
        case "move-x":
          setPosition((prev) => ({ ...prev, x: prev.x + 50 }));
          break;
        case "move-y":
          setPosition((prev) => ({ ...prev, y: prev.y + 50 }));
          break;
        case "rotate360":
          setRotation((prev) => prev + 360);
          break;
        case "goTo":
          setPosition({ x: 0, y: 0 });
          setRotation(0);
        case "move-x-y-negative":
          setPosition((prev) => ({ x: prev.x - 50, y: prev.y - 50 }));
          break;
        case "goToRandom":
          const randomX = Math.floor(Math.random() * 200);
          const randomY = Math.floor(Math.random() * 200);
          setPosition({ x: randomX, y: randomY });
          break;
        case "sayHello":
          setMessage(content);
          setTimeout(() => setMessage(""), 1000); // Clear the message after 1 second
          break;

        default:
          break;
      }
      setTimeout(resolve, 1000); // Adjust time for each animation if needed
    });
  };

  const handleOnDrag = (e, data) => {
    // Update drag position
    setPosition({ x: data.x, y: data.y });
  };

  const rotateElement = () => {
    // Perform rotation animation here
    // Example: Using CSS transition
    const element = document.getElementById("animate");
    if (element) {
      element.style.transition = "transform 1s";
      element.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`;
    }
  };

  // Run rotateElement whenever rotation changes
  useEffect(() => {
    rotateElement();
  }, [rotation]);
  return (
    <>
      <div className="w-full bg-blue-100 pt-6 font-sans">
        <div className="w-full h-screen flex flex-row  ">
          <div className="w-1/2 flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Sidebar items={items} performAnimation={performAnimation} />{" "}
              <MidArea todo={todo} performAnimation={performAnimation} />
            </DragDropContext>
          </div>
          <div className="w-1/2 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea
              handlePlay={handlePlay}
              position={position}
              setPosition={setPosition}
              rotation={rotation}
              handleReset={handleReset}
              message={message}
              todo={todo}
              handleOnDrag={handleOnDrag}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SketchDemo;
