import React, { useContext, useEffect } from "react";
// COMPONENTS
import { Context } from "../Context";
// NPMS
import { useNavigate } from "react-router-dom";
const Loading = () => {
  const navigate = useNavigate();
  const { state } = useContext(Context);

  useEffect(() => {
    console.log(state);
    if (state.isAuth) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [state.isAuth]);

  return <div id="loader"></div>;
};

export default Loading;
