import React, { useState, useContext, useEffect } from "react";
// COMPONENTS
import Header from "./header/Header";
import { Context } from "./Context";
// IMAGE
import homepageimg from "../assets/login/homepage.jpg";
// NPMS
import $ from "jquery";
// HOOKS
import usePost from "../hooks/usePost";
const Login = () => {
  const { state } = useContext(Context);
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

  // EMAIL AND PASSWORD VALUES INITIAL
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  // POST BODY
  const [body, setBody] = useState({});
  // POST URL
  const [url, setUrl] = useState("");
  // MSG FROM THE SERVER

  const loginHandle = async () => {
    setUrl("/api/v1/user/log_in");
    setBody({ email, password, title });
  };

  // AXIOS POST HOOK
  usePost(url, body);

  useEffect(() => {
    if (state.msg && state.msg !== 'PAGE DOES NOT EXIST') {
      $('.msg').css('opacity', 1);
    }
  }, [state.msg]);

  const wrong = () => {
    $("#emailInput").css({
      backgroundColor: "var(--errorRed)",
    });
    setTimeout(() => {
      $("#emailInput").css({
        backgroundColor: "white",
      });
    }, 1000);
  };
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
          <div className="msg">
            {state.msg}
          </div>
          <button onMouseDown={() => loginHandle()}>LOGIN</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
