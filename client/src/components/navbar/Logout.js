import React, { useState, useEffect, useContext } from "react";

// HOOKS
import usePost from "../../hooks/usePost";
import useAuth from "../../hooks/useInfo";

// COMPONENTS
import { Context } from "../Context";

// NPMS
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [url, setUrl] = useState("");
  const [body, setBody] = useState({});
  const { state, dispatch } = useContext(Context);
  const [cookies, setCookie] = useCookies(["refresh_token"]);
  const navigate = useNavigate();

  const logout = async () => {
    setUrl("/api/v1/user/logout");
  };

  useEffect(() => {
    dispatch({ type: "ACCESS_TOKEN", payload: "" });
    dispatch({ type: "ISAUTH", payload: "" });
    setCookie("refresh_token", "");
  }, [state.isAuth]);

  usePost(url, body);

  return (
    <section id="logout" onClick={() => logout()}>
      LOGOUT
    </section>
  );
};

export default Logout;
