import React, { useState } from "react";

const List = React.memo(
  ({
    provided,
    snapshot,
    data,
    id,
    handleCompleteChange,
    handleClick,
    todoData,
    setTodoData,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(data.title);

    const handleEditingTitle = (e) => {
      setEditedTitle(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = editedTitle;
        }
        return data;
      });
      setTodoData(newTodoData);
      setIsEditing(!isEditing);
    };

    if (isEditing) {
      return (
        <div
          className={`${"bg-gray-100"} flex items-center justify-between w-full px-4 py-2 my-2 text-gray-600  border rounded`}
        >
          <div className="items-center">
            <form onSubmit={handleSubmit}>
              <input
                value={editedTitle}
                onChange={handleEditingTitle}
                className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
              />
            </form>
          </div>
          <div className="items-center">
            <button className="px-3" onClick={handleSubmit} type="submit">
              Save
            </button>
          </div>
        </div>
      );
    } else {
      return (
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
            <span className={data.completed ? "line-through" : null}>
              {data.title}
            </span>
          </div>
          <div className="items-center">
            <button
              className="px-3"
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              Edit
            </button>
            <button
              className="px-1"
              onClick={() => {
                handleClick(data.id);
              }}
            >
              X
            </button>
          </div>
        </div>
      );
    }
  }
);

export default List;
