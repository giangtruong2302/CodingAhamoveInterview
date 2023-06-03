import React from "react";
import { useStore } from "../../../store/store";
import classNames from "classnames";

const Task = ({ title, key }) => {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);
  return (
    <div
      className="bg-slate-400 rounded-[4px] min-h-[80px] p-[8px] text-[#000] cursor-move flex flex-col justify-between"
      draggable
      onDragStart={() => setDraggedTask(title)}
    >
      <div>{task.title}</div>
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
