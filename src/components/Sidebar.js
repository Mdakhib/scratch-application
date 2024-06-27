import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function Sidebar({ items }) {
  return (
    <>
      <Droppable droppableId="items">
        {(provided) => (
          <div
            className="w-1/2 flex-none h-full overflow-y-auto flex flex-col items-start p-4 border-r border-gray-200"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h2 className="text-xl font-bold mb-4">Motion</h2>
            {items.map(({ id, content }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-2 my-2 text-sm cursor-pointer"
                  >
                    {content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
}
