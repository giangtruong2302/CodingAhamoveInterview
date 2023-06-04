import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 fixed bottom-0 w-full">
      <Link
        href={"https://dyno-personal.vercel.app/"}
        target="_blank"
        className="flex gap-2 items-center"
      >
        <p className="text-left">
          2023 Todo App. Copyright&#169; by Duong Truong Giang.
        </p>
        <img
          src="./icons/open1.png"
          alt="openNewTab"
          className="w-[20px] h-[20px] object-contain text-[#fff]"
        />
      </Link>
    </footer>
  );
};

export default Footer;
