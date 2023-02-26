import React, { useEffect, useState, useContext } from "react";

// COMPONENTS
import { Context } from "../../data/Context";

// NPMS
import $ from "jquery";

const NavBtn = () => {
  const {state,dispatch} = useContext(Context)
  useEffect(() => {
    if (state.isNavbar) {
      $("nav").css("transform", "translateX(0)");
    } else {
      $("nav").css("transform", "translateX(-10rem)");
    }
  }, [state.isNavbar]);
  
  const clickHandle = () => {
    dispatch({type:'IS_NAVBAR', payload: !state.isNavbar})
  };

  return (
    <div id="navBtnContainer">
      <div id="navBtn" onClick={() => clickHandle()}>
        &#8646;
      </div>
    </div>
  );
};

export default NavBtn;
