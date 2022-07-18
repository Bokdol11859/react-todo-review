import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function List({ todoData, setTodoData }) {
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  };

  const handleCompleteChange = (id) => {
    let tempTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(tempTodoData);
  };

  const handleEnd = (result) => {
    if (!result.destination) return;
    const tempTodoData = todoData;

    const [reorderedItem] = tempTodoData.splice(result.source.index, 1);

    tempTodoData.splice(result.destination.index, 0, reorderedItem);

    setTodoData(tempTodoData);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      key={data.id}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      className={`${
                        snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
                      } flex items-center justify-between w-full px-4 py-2 my-2 text-gray-600  border rounded`}
                    >
                      <div className="items-center">
                        <input
                          type="checkbox"
                          defaultChecked={data.completed}
                          className="mr-4"
                          onChange={() => {
                            handleCompleteChange(data.id);
                          }}
                        />
                        <span
                          className={data.completed ? "line-through" : null}
                        >
                          {data.title}
                        </span>
                      </div>
                      <div className="items-center">
                        <button
                          onClick={() => {
                            handleClick(data.id);
                          }}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
