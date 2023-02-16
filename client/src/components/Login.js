import React, { useState, useContext } from "react";
// IMAGE
import homepageimg from "../assets/login/homepage.jpg";
// NPMS
import axios from "axios";
import $ from "jquery";
// HOOKS
import usePost from "../hooks/usePost";
const Login = () => {
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
    console.log(title);
    setUrl("/api/v1/user/log_in");
    setBody({ email, password, title });
  };

  usePost(url, body);
  return (
    <section id="login">
      <figcaption id="loginImgContainer">
        <img id="homepageimg" src={homepageimg} alt="Home Page" />
      </figcaption>
      <div id="loginContainer">
        <div id="universityName">GRADES-API</div>
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
          <div className="msg"></div>
          <button onMouseDown={() => loginHandle()}>LOGIN</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
