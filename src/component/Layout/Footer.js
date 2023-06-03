import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 fixed bottom-0 w-full">
      <Link href={"https://dyno-personal.vercel.app/"} target="_blank">
        <p className="text-left">
          2023 Todo App. Copyright&#169; by Duong Truong Giang.
        </p>
      </Link>
    </footer>
  );
};

export default Footer;
