import React, { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <aside className="bg-gray-200 w-64 hidden md:block">
      <div className="text-4xl font-bold text-gray-600 text-center py-3">
        TodoApp
      </div>
      <ul className="p-4 flex flex-col gap-4">
        <li className="mb-2">
          <a href="#" className="text-gray-800 hover:text-gray-600">
            Dashboard
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-gray-800 hover:text-gray-600">
            Posts
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-gray-800 hover:text-gray-600">
            Users
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
