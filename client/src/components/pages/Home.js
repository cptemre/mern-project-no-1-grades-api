import React, { useContext, useEffect, useState } from "react";
// COMPONENTS
import Navbar from "../navbar/Navbar";
import Header from "../header/Header";
import Teachers from "./Teachers";
import Login from "../Login";
import Loading from "../loading/Loading";
import { Context } from "../Context";

// HOOKS
import useAuth from "../../hooks/useAuth";

// NPMS
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import $ from "jquery";

const Home = () => {
  const { state } = useContext(Context);
  const [cookies, setCookie] = useCookies(["isAuth"]);
  const [isLoad, setIsLoad] = useState(false);
  const { component } = useParams();
  // SET AUTHORIZATION AND STATES
  useAuth();

  // UNTIL STATE OR ISLOAD GETS READ SHOW LOADING SCREEN THEN SHOW PAGE OR LOGIN DEPENDS ON AUTHORIZATION
  useEffect(() => {
    load();
  }, [state]);
  const load = () => {
    setTimeout(() => {
      setIsLoad(true);
    }, 1000);
  };

  // SET SELECTED BUTTON COLOR
  useEffect(() => {
    if ((state.title, component, isLoad)) {
      $(`#${component}Option`).css("background-color", "red");
    }
  }, [state.title, component, isLoad]);
  return (
    <>
      {!state || !isLoad ? (
        <Loading />
      ) : cookies.isAuth === "true" ? (
        <section id="home">
          <Navbar />
          <Header />
          {state.title === "admin" && component === "teachers" ? (
            <Teachers />
          ) : (
            "else"
          )}
        </section>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
