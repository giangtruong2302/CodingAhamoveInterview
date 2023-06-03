import React from "react";
import Column from "./Column";

const Todo = () => {
  return (
    <div className="flex justify-center flex-col gap-3 w-full mx-auto bg-transparent h-full md:flex-row md:gap-3  items-center">
      <Column state="To do" />
      <Column state="Work in process" />
      <Column state="Done" />
    </div>
  );
};

export default Todo;
