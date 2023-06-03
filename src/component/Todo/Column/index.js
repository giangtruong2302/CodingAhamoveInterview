import React, { useState } from "react";
import Task from "../Task";
import { useStore } from "../../../store/store";
import { shallow } from "zustand/shallow";
import classNames from "classnames";

const Column = ({ state }) => {
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
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
        "bg-[#e9ecef] shadow border-[1px] border-solid border-transparent min-h-[320px] w-full max-w-[320px] rounded-[8px] flex flex-col gap-3 px-4 py-4",
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
        moveTask(draggedTask.title, state, draggedTask.content);
        setDraggedTask(null);
      }}
    >
      <div className="flex justify-between items-center">
        <p className="text-[16px] font-semibold">{state}</p>
        <button
          className="px-6 py-2 rounded-[8px] bg-gray-900 text-white font-bold flex gap-2"
          onClick={() => setOpen(true)}
        >
          Add
        </button>
      </div>
      <div className="h-[500px] max-h-fit overflow-auto flex flex-col gap-2 pt-2 border-t-black  border-t-[1px] border-solid">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <Task title={task.title} content={task.content} key={task.title} />
          ))
        ) : (
          <div className="flex justify-center items-center">
            <div className="flex flex-col gap-[8px]">
              <img
                src="./images/robot.gif"
                alt="empty"
                className="w-[200px] h-[200px] object-cover "
              />
              <div>
                <p>You don&apos;t have task in {state}</p>
                <p
                  className="text-center hover:underline-offset-2 text-blue-500 hover:underline cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  + Add
                </p>
              </div>
            </div>
          </div>
        )}
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
            <textarea
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="what are you doing today ?"
              required
              cols={3}
              rows={4}
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-blue-400"
                onClick={() => {
                  addTask(text, content, state);
                  setText("");
                  setContent("");
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
