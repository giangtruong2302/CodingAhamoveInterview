import React, { useState } from "react";
import { useStore } from "../../../store/store";
import classNames from "classnames";

const Task = ({ title, key }) => {
  const [expanded, setExpanded] = useState(false);
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
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
          : "bg-green-400"
      } rounded-[4px] min-h-[80px] p-[8px] text-[#fff] cursor-move flex flex-col gap-2 justify-between`}
      draggable
      onDragStart={() => setDraggedTask(title)}
    >
      <div className="overflow-hidden">
        <div className={`line-clamp-${expanded ? "none" : "2"}`}>
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
      <div className="flex justify-between">
        <div onClick={() => deleteTask(task.title)} className="cursor-pointer">
          <img src={"/icons/trash-2.svg"} alt={task.title} />
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
