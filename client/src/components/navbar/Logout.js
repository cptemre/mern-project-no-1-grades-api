import React, { useState, useEffect, useContext } from "react";

// HOOKS
import usePost from "../../hooks/usePost";
import useAuth from "../../hooks/useAuth";

// COMPONENTS
import { Context } from "../Context";

// NPMS
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [url, setUrl] = useState("");
  const [body, setBody] = useState({});
  const { state, dispatch } = useContext(Context);
  const [cookies, setCookie] = useCookies(["refresh_token", "isAuth"]);
  const navigate = useNavigate();

  const logout = () => {
    setUrl("/api/v1/user/logout");
    setCookie("refresh_token", "");
    dispatch({ type: "ACCESS_TOKEN", payload: "" });
    setCookie("isAuth", false);
  };

  usePost(url, body);
  return (
    <section id="logout" onClick={() => logout()}>
      LOGOUT
    </section>
  );
};

export default Logout;
