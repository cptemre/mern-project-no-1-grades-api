import React, { useState, useEffect, useContext } from "react";

// HOOKS
import useFetch from "../../hooks/useFetch";

// COMPONENTS
import { Context } from "../../data/Context";

// NPMS
import { useCookies } from "react-cookie";

const Logout = () => {
  const [url, setUrl] = useState("");
  const [body, setBody] = useState({});
  const { state, dispatch } = useContext(Context);
  const [cookies, setCookie] = useCookies(["refresh_token", "isAuth"]);

  const logout = () => {
    setUrl("/api/v1/user/logout");
    setCookie("refresh_token", "");
    dispatch({ type: "ACCESS_TOKEN", payload: "" });
    setCookie("isAuth", false);
  };

  useFetch(url, body);
  return (
    <section id="logout" onClick={() => logout()}>
      LOGOUT
    </section>
  );
};

export default Logout;
