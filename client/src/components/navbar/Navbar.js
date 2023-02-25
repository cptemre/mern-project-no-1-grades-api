import React, { useState, useContext } from "react";

// * Components
import NavBtn from "./NavBtn";
import UserInfo from "./UserInfo";
import Options from "./Options";
import Logout from "./Logout";
import { Context } from "../../data/Context";

const Navbar = () => {
  const { state } = useContext(Context);

  return (
    <nav>
      <NavBtn/>
      <UserInfo />
      <Options />
      <Logout />
    </nav>
  );
};

export default Navbar;
