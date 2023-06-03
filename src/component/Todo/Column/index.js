import React, { useState } from "react";
import Task from "../Task";
import { useStore } from "../../../store/store";
import { shallow } from "zustand/shallow";
import classNames from "classnames";

const Column = ({ state }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );
  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);
  return (
    <div
      className={classNames(
        "bg-transparent border-[1px] border-solid border-[#000] min-h-[320px] w-full max-w-[320px] rounded-[4px] flex flex-col gap-3 px-4 py-4",
        { "drop border-color-white": drop }
      )}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={(e) => {
        setDrop(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <div className="flex justify-between">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      <div className="h-[500px] overflow-auto flex flex-col gap-2">
        {tasks.map((task) => (
          <Task title={task.title} key={task.title} />
        ))}
      </div>
      {open && (
        <div className="absolute inset-0 flex justify-center items-center bg-opacity-30 bg-gray-950">
          <div className="bg-white p-6 rounded-md shadow-lg w-[300px]">
            <div>Create new task</div>
            <input
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="what are you doing today ?"
              required
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-blue-400"
                onClick={() => {
                  addTask(text, state);
                  setText("");
                  setOpen(false);
                }}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-blue-400"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Column;
