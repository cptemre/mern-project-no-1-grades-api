import React, { useContext, useEffect, useState } from "react";
// COMPONENTS
import Navbar from "../navbar/Navbar";
import Admin from "./Admin";
import Login from "../login/Login";
import { Context } from "../../data/Context";

// HOOKS
import useAuth from "../../hooks/useAuth";

// NPMS
import { useCookies } from "react-cookie";

const Home = () => {
  const { state } = useContext(Context);
  const [cookies, setCookie] = useCookies(["isAuth"]);
  // SET AUTHORIZATION AND STATES
  useAuth();

  return (
    <>
      {cookies.isAuth === "true" ? (
        <section id="home">
          <Navbar />
          <div className="universityName" id="banner">
            {state.title.toUpperCase()} PANEL
          </div>
          {state.title === "admin" ? (
            <Admin />
          ) : state.title === "teacher" ? (
            "teacher"
          ) : (
            "student"
          )}
        </section>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
