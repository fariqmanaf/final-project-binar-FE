import React from "react";
import { useNavigate } from "@tanstack/react-router";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white shadow-md py-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-start">
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-10 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
    </nav>
  );
};

export default Navbar;
