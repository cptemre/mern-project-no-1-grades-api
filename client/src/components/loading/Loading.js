import React, { useContext, useEffect } from "react";
// COMPONENTS
import { Context } from "../Context";
// NPMS
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Loading = () => {
  const navigate = useNavigate();
  const { state } = useContext(Context);
  const [cookies, setCookie] = useCookies(["isAuth"]);

  useEffect(() => {
    console.log(state);
    if (cookies.isAuth === "false") {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, [cookies.isAuth]);
  return <div id="loader"></div>;
};

export default Loading;
