import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <header className="flex justify-between p-4 bg-white border-b-2 border-black">
      <div className="flex justify-center m-auto items-center">
        <div className="mr-10">
          <Link to="/edit-user">
            <button
              className={`px-20 py-3 border-2 transition-all duration-300 
              ${
                location.pathname === "/edit-user"
                  ? "bg-gray-300 text-black"
                  : "bg-white text-black"
              } 
            hover:bg-gray-100`}
            >
              Edit Users
            </button>
          </Link>
        </div>

        <div>
          <Link to="/users">
            <button
              className={`px-20 py-3 border-2 transition-all duration-300 
              ${
                location.pathname === "/users"
                  ? "bg-gray-300 text-black"
                  : "bg-white text-black"
              } 
              hover:bg-gray-100`}
            >
              Users
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
