import Link from "next/link";
import React from "react";
import { ModeToggle } from "./toggle";

const Navbar = () => {
  return (
    <nav className="w-full h-20 flex items-center mb-2">
      <div className="flex items-center justify-center text-xl h-full w-1/6 bg-gradient-to-r from-purple-500 to-blue-300 rounded-br-full">
        <Link href="/">Solana</Link>
      </div>
      <div className="w-5/6 flex gap-20 justify-center">
        <Link
          className="font-bold hover:scale-125 transition duration-100 ease-in-out"
          href="/docs"
        >
          Docs
        </Link>
        <Link
          className="font-bold hover:scale-125 transition duration-300 ease-in-out"
          href="/about"
        >
          About
        </Link>
        <Link
          className="font-bold hover:scale-125 transition duration-300 ease-in-out"
          href="/merchant"
        >
          Merchant
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
