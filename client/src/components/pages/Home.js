import React, { useContext, useEffect, useState } from "react";
// COMPONENTS
import Navbar from "../navbar/Navbar";
import Header from "../header/Header";
import Admin from "./Teachers";
import Login from "../Login";
import Loading from "../loading/Loading";
import { Context } from "../Context";

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
          <Header />
          {state.title === "admin" ? <Admin /> : "else"}
        </section>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
