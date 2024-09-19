import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between p-4 bg-gray-100">
      <div className="flex justify-center m-auto items-center">
        <div className="mr-10">
          <Button borderColor="blue">
            <Link to="/users">Users</Link>
          </Button>
        </div>

        <div>
          <Button borderColor="green">
            <Link to="/edit-user">Edit Users</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
