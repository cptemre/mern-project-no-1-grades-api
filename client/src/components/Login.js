import React, { useState } from "react";
// IMAGE
import homepageimg from "../assets/login/homepage.jpg";
// NPMS
import axios from "axios";
import $ from "jquery";
const Login = () => {
  // EMAIL AND PASSWORD VALUES INITIAL
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");

  const loginHandle = async () => {
    console.log(title);
    try {
      const { data } = await axios.post("/api/v1/user/log_in", {
        email,
        password,
        title,
      });
      console.log(data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const radioHandle = (e) => {};

  return (
    <section id="login">
      <figcaption id="loginImgContainer">
        <img id="homepageimg" src={homepageimg} alt="Home Page" />
      </figcaption>
      <div id="loginContainer">
        <div id="universityName">GRADES-API</div>
        <form id="loginForm" onSubmit={(e) => e.preventDefault()}>
          <div className="inputDiv" id="radioContainer">
            <div className="radioDiv">
              <label htmlFor="teacherRadio">TEACHER</label>
              <input type="radio" id="teacherRadio" name="title" />
            </div>
            <div className="radioDiv">
              <label htmlFor="studentRadio">STUDENT</label>
              <input type="radio" id="studentRadio" name="title" />
            </div>
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
          <div id="msg">LOGIN DENIED</div>
          <button onMouseDown={() => loginHandle()}>LOGIN</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
