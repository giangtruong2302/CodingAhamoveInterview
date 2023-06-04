import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const router = useRouter();
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("user"));
    if (authData && authData.username) {
      setDisplayName(authData.username);
    }
  }, []);
  const handleLogout = () => {
    const authData = JSON.parse(localStorage.getItem("user"));
    if (!authData) return;
    const username = authData.username;
    const password = authData.password;
    const isLogout = true;
    localStorage.setItem(
      "user",
      JSON.stringify({ username, password, isLogout })
    );
    router.push("/login");
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{displayName}</h1>
        <span onClick={handleLogout} className="cursor-pointer">
          Logout
        </span>

        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path d="M5 13l-5 5 2 2 5-5 5 5 2-2-5-5 5-5-2-2-5 5zm14-6l-2-2-5 5-5-5-2 2 5 5-5 5 2 2 5-5 5 5 2-2-5-5z" />
            ) : (
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            )}
          </svg>
        </button>
      </div>
      {isOpen && (
        <nav className="mt-4 md:hidden">
          <ul className="flex flex-col items-center">
            <li className="mb-2">
              <a
                href="#"
                className="text-gray-300 hover:text-white"
                onClick={toggleMenu}
              >
                Dashboard
              </a>
            </li>
            <li className="mb-2">
              <span className="cursor-pointer" onClick={handleLogout}>
                Logout
              </span>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
