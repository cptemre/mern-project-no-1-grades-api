import React, { useState, useContext, useEffect } from "react";
// COMPONENTS

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

library.add(faUser, faKey);

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

    // INPUT ANIMATION AND CHANGES DEPENDS ON ERROR MESSAGE
    if (state.msg.includes("EMAIL")) {
      $("#emailIcon").css({
        backgroundColor: "var(--errorRed)",
      });
      // TURN BACK THE PASSWORD TO INITIAL
      $("#passwordIcon").css({
        backgroundColor: "var(--iconBg)",
      });
    }

    if (state.msg.includes("PASSWORD")) {
      $("#passwordIcon").css({
        backgroundColor: "var(--errorRed)",
      });
      // TURN BACK THE EMAIL TO INITIAL
      $("#emailIcon").css({
        backgroundColor: "var(--iconBg)",
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
        <form id="loginForm" onSubmit={(e) => e.preventDefault()}>
          <div className="universityName" id="loginHeader">
            LOGIN
          </div>
          <div id="inputContainer">
            <div id="emailDiv" className="inputContainer">
              <div className="iconContainer" id="emailIcon">
                <FontAwesomeIcon icon="fa-user" className="icon" />
              </div>
              <input
                placeholder="EMAIL"
                type="email"
                id="emailInput"
                name="email"
                className="loginInput"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
              />
            </div>
            <div id="passwordDiv" className="inputContainer">
              <div className="iconContainer" id="passwordIcon">
                <FontAwesomeIcon icon="fa-key" className="icon" />
              </div>
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
          </div>

          <div id="btnContainer">
            <button onMouseDown={() => loginHandle()}>LOGIN</button>
          </div>
          <div className="universityName" id="loginFooter">
            GRADES-API
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
