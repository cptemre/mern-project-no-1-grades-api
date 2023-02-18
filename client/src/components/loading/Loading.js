import React, { useContext, useEffect } from "react";
// COMPONENTS
import { Context } from "../Context";
import useInfo from "../../hooks/useAuth";

// NPMS
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Loading = () => {
  const navigate = useNavigate();
  const { state } = useContext(Context);
  const [cookies, setCookie] = useCookies(["isAuth"]);
  useEffect(() => {
    console.log(cookies.isAuth);
    if (cookies.isAuth && cookies.isAuth === "true") {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [cookies.isAuth]);
  useInfo();
  return <div id="loader"></div>;
};

export default Loading;
