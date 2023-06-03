import React, { useState } from "react";
import { useStore } from "../../../store/store";
import classNames from "classnames";

const Task = ({ title, content, key }) => {
  const [expanded, setExpanded] = useState(false);
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  console.log("check task: ", task);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);
  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <div
      className={`${
        task.state === "To do"
          ? "bg-gray-400"
          : task.state === "Work in process"
          ? "bg-blue-400"
          : task.state === "Re-work"
          ? "bg-red-400"
          : "bg-green-700"
      } rounded-[4px] h-fit p-[8px] text-[#fff] cursor-move flex flex-col gap-2 justify-between`}
      draggable
      onDragStart={() => setDraggedTask(title, content)}
    >
      <div className="overflow-hidden">
        <div
          className={`text-[20px] break-normal ${
            !expanded ? "line-clamp-2" : "none"
          }`}
        >
          {task.title}
        </div>
      </div>
      {task.title.length > 50 && (
        <div
          className="text-[12px] cursor-pointer"
          onClick={handleToggleExpand}
        >
          {expanded ? "Show less" : "Show more"}
        </div>
      )}
      <div className="overflow-hidden">
        <div className={`break-normal ${!expanded ? "line-clamp-2" : "none"}`}>
          {task.content}
        </div>
      </div>
      {/* {task.content.length > 50 && (
        <div
          className="text-[12px] cursor-pointer"
          onClick={handleToggleExpand}
        >
          {expanded ? "Show less" : "Show more"}
        </div>
      )} */}
      <div className="flex justify-between mt-3">
        <div onClick={() => deleteTask(task.title)} className="cursor-pointer">
          <img
            src={"/icons/trash-2.svg"}
            alt={task.title}
            className="w-[20px] h-[20px] "
          />
        </div>
        <div
          className={classNames(
            "text-[12px] p-[4px] rounded-[4px]",
            task.state
          )}
        >
          {task.state}
        </div>
      </div>
    </div>
  );
};

export default Task;
