import React, { useState, useContext, useEffect } from "react";
// COMPONENTS

import Header from "../header/Header";
import { Context } from "../../data/Context";
// IMAGE
import homepageimg from "../../assets/login/homepage.jpg";
// NPMS
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// HOOKS
import useFetch from "../../hooks/useFetch";
// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";

library.add(faUser,faKey);

const Login = () => {
  const { state } = useContext(Context);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["isAuth"]);
  // EMAIL AND PASSWORD VALUES INITIAL
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  // POST BODY
  const [body, setBody] = useState({});
  // POST URL
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (cookies.isAuth && cookies.isAuth === "true") {
      navigate("/");
    }
  }, [cookies.isAuth]);
  const loginHandle = () => {
    setUrl("/api/v1/user/log_in");
    setBody({ email, password, title });
    if (email.endsWith("@ga.pl")) {
      setTitle("teacher");
    } else if (email.endsWith("@edu.ga.pl")) {
      setTitle("student");
    }
  };

  useEffect(() => {
    msgHandle();
  }, [state.msg]);

  const msgHandle = () => {
    // SERVER ERROR MESSAGES FOR LOGIN
    const messages = [
      "EMAIL IS REQUIRED",
      "PASSWORD IS REQUIRED",
      "EMAIL IS NOT ACCEPTED",
      "PASSWORD IS WRONG",
      "EMAIL IS WRONG",
    ];
    // SHOW MESSAGE IF IT INCLUDES ABOVE
    if (messages.includes(state.msg)) {
      $(".msg").css("opacity", 1);
    }

    // INPUT ANIMATION AND CHANGES DEPENDS ON ERROR MESSAGE
    if (state.msg.includes("EMAIL")) {
      $("#emailInput").css({
        borderColor: "red",
      });
      // TURN BACK THE PASSWORD TO INITIAL
      $("#passwordInput").css({
        borderColor: "black",
      });
    }

    if (state.msg.includes("PASSWORD")) {
      $("#passwordInput").css({
        borderColor: "red",
      });
      // TURN BACK THE EMAIL TO INITIAL
      $("#emailInput").css({
        borderColor: "black",
      });
    }
  };

  // AXIOS POST HOOK
  useFetch(url, body, "post");

  return (
    <section id="login">
      <figcaption id="loginImgContainer">
        <img id="homepageimg" src={homepageimg} alt="Home Page" />
      </figcaption>
      <div id="loginContainer">
        <Header />
        <form id="loginForm" onSubmit={(e) => e.preventDefault()}>
          <div id="emailDiv" className="inputContainer">
            <FontAwesomeIcon icon="fa-user" />
            <input
              placeholder="EMAIL"
              type="email"
              id="emailInput"
              name="email"
              className="loginInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div id="passwordDiv" className="inputContainer">
            <FontAwesomeIcon icon="fa-key" />
            <input
              placeholder="PASSWORD"
              type="password"
              id="passwordInput"
              name="password"
              className="loginInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="msg">{state.msg}</div>
          <button onMouseDown={() => loginHandle()}>LOGIN</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
