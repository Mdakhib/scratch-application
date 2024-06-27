import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function MidArea({ todo }) {
  return (
    <>
      <Droppable droppableId="todo">
        {(provided) => (
          <div
            className="w-1/2 bg-gray-100 p-4 rounded shadow-md"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h2 className="text-xl font-bold mb-4">Selected Motion</h2>

            {todo.map(({ id, content }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white p-2 mb-2 rounded shadow-md"
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
