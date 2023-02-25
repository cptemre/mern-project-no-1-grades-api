import React, { useEffect, useState } from "react";

// NPMS
import $ from "jquery";

const NavBtn = () => {
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    if (isClicked) {
      $("nav").css("transform", "translateX(0)");
    } else {
      $("nav").css("transform", "translateX(-10rem)");
    }
  }, [isClicked]);
  const clickHandle = () => {
    setIsClicked(!isClicked);
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
