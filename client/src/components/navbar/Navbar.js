import React, {useState, useContext} from "react";

// * Components
import UserInfo from "./UserInfo";
import Options from "./Options";
import Logout from "./Logout";
import { Context } from "../Context";

const Navbar = () => {
  const { state } = useContext(Context);

  return (
    <nav>
      <UserInfo />
      <Options />
      <Logout />
    </nav>
  );
};

export default Navbar;
