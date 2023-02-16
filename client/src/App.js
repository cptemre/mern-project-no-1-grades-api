import React, { useReducer, useEffect, useState } from "react";
// * COMPONENTS
// NAVBAR
import Navbar from "./components/navbar/Navbar";
import Login from "./components/Login";
import Teachers from "./components/pages/Teachers";
import { Context } from "./components/Context";
// * DATA
import { reducer, defaultState } from "./data/reducer";
// * ROUTER
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// * NPMS
import { useJwt } from "react-jwt";

// * CSS
// MAIN
import "./css/index.css";

// LOGIN
import "./css/login/login.css";

// NAVBAR
import "./css/navbar/navbar.css";
// USER INFO
import "./css/navbar/userInfo.css";
// OPTIONS
import "./css/navbar/options.css";
// LOGOUT
import "./css/navbar/logout.css";

// PAGES
import "./css/pages/teachers.css";

const App = () => {
  // * REDUCER SETUP
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { decodedToken, isExpired } = useJwt(state.access_token);

  // DECODE THE TOKEN AND SET USER INFO TO STATE
  useEffect(() => {
    if (decodedToken) {
      const { ID, name, surname, email, title } = decodedToken;
      dispatch({ type: "ID", payload: ID });
      dispatch({ type: "NAME", payload: name });
      dispatch({ type: "SURNAME", payload: surname });
      dispatch({ type: "EMAIL", payload: email });
      if (email === "admin@ga.pl") {
        dispatch({ type: "TITLE", payload: "admin" });
      } else {
        dispatch({ type: "TITLE", payload: title });
      }
    }
  }, [decodedToken]);
  return (
    <Router>
      {!isExpired && (
        <Context.Provider value={{ state }}>
          <Navbar />
        </Context.Provider>
      )}
      <Routes>
        {!isExpired ? (
          <Route
            path="/"
            element={
              <Context.Provider value={{ state, dispatch }}>
                <Teachers />
              </Context.Provider>
            }
          />
        ) : (
          <Route
            path="/"
            element={
              <Context.Provider value={{ state, dispatch }}>
                <Login />
              </Context.Provider>
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
