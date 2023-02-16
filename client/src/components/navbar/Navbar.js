import React from "react";

// * Components
import UserInfo from "./UserInfo";
import Options from "./Options";
import Logout from "./Logout";

const Navbar = () => {
  return (
    <nav>
      <UserInfo />
      <Options />
      <Logout />
    </nav>
  );
};

export default Navbar;
