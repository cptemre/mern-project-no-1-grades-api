import React, { useContext } from "react";
// COMPONENTS
import Navbar from "../navbar/Navbar";
import Admin from "./Admin";
import Teacher from "./teacher/Teacher";
import Login from "../login/Login";
import { Context } from "../../data/Context";

// HOOKS
import useAuth from "../../hooks/useAuth";

// NPMS
import { useCookies } from "react-cookie";

const Home = () => {
  const { state, dispatch } = useContext(Context);
  const [cookies, setCookie] = useCookies(["isAuth"]);
  // SET AUTHORIZATION AND STATES
  useAuth();

  const bannerHandle = () => {
    dispatch({ type: "IS_NAVBAR", payload: false });
    dispatch({ type: "IS_SEMESTER", payload: false });
  };

  return (
    <>
      {cookies.isAuth === "true" ? (
        <section id="home">
          <Navbar />
          <div
            className="universityName"
            id="banner"
            onClick={() => bannerHandle()}
          >
            {state.title.toUpperCase()} PANEL
          </div>
          {state.title === "admin" ? (
            <Admin />
          ) : state.title === "teacher" ? (
            <Teacher />
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
