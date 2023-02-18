import React, { useState, useContext, useEffect } from "react";
// COMPONENTS
import Header from "./header/Header";
import { Context } from "./Context";
// IMAGE
import homepageimg from "../assets/login/homepage.jpg";
// NPMS
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// HOOKS
import usePost from "../hooks/usePost";
import useInfo from "../hooks/useInfo";
const Login = () => {
  const { state } = useContext(Context);
  const navigate = useNavigate();
  // RADIO KEYS
  const radioJSX = [
    {
      id: "teacherRadio",
      html: "TEACHER",
      title: "teacher",
    },
    {
      id: "studentRadio",
      html: "STUDENT",
      title: "student",
    },
  ];
  const [cookies, setCookie] = useCookies(["isAuth"]);
  // EMAIL AND PASSWORD VALUES INITIAL
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  // POST BODY
  const [body, setBody] = useState({});
  // POST URL
  const [url, setUrl] = useState("");

  const loginHandle = async () => {
    setUrl("/api/v1/user/log_in");
    setBody({ email, password, title });
  };
  // AXIOS POST HOOK
  usePost(url, body);
  useInfo();
  console.log(cookies.isAuth);
  useEffect(() => {
    if (cookies.isAuth === 'true') {
      navigate("/");
    }
  }, [cookies.isAuth]);

  useEffect(() => {
    if (state.msg && state.msg !== "PAGE DOES NOT EXIST") {
      $(".msg").css("opacity", 1);
    }
  }, [state.msg]);

  return (
    <section id="login">
      <figcaption id="loginImgContainer">
        <img id="homepageimg" src={homepageimg} alt="Home Page" />
      </figcaption>
      <div id="loginContainer">
        <Header />
        <form id="loginForm" onSubmit={(e) => e.preventDefault()}>
          <div className="inputDiv" id="radioContainer">
            {radioJSX.map((radio) => {
              const { id, html, title } = radio;
              return (
                <div className="radioDiv" key={id}>
                  <label htmlFor={id}>{html}</label>
                  <input
                    type="radio"
                    data-title={title}
                    id={id}
                    name="title"
                    onClick={(e) => setTitle($(e.target).attr("data-title"))}
                  />
                </div>
              );
            })}
          </div>
          <input
            placeholder="EMAIL"
            type="email"
            id="emailInput"
            name="email"
            className="loginInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="PASSWORD"
            type="password"
            id="passwordInput"
            name="password"
            className="loginInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="msg">{state.msg}</div>
          <button onMouseDown={() => loginHandle()}>LOGIN</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
