import React, { useReducer, useEffect, useState } from "react";
// * COMPONENTS
// NAVBAR
import Login from "./components/Login";
import Home from "./components/pages/Home";
import { Context } from "./components/Context";
// * DATA
import { reducer, defaultState } from "./data/reducer";
// * ROUTER
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// * NPMS
import { useJwt } from "react-jwt";
import { useCookies } from "react-cookie";
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
// HOME
import "./css/pages/home.css";
import "./css/pages/teachers.css";

const App = () => {
  // * REDUCER SETUP
  const [state, dispatch] = useReducer(reducer, defaultState);
  // TOKEN SETUP
  const [jwt, setJwt] = useState("");
  const { decodedToken, isExpired } = useJwt(jwt);
  // COOKIES
  const [cookies, setCookie] = useCookies(["refresh_token"]);

  // SET JWT TO ACCESS TOKEN WHEN IT IS CHANGED WHICH WILL DECODE WITH USEJWT
  useEffect(() => {
    if (state.access_token) {
      setJwt(state.access_token);
    }
  }, [state.access_token]);
  // IF IT IS EXPIRED AND THERE IS JWT SET ALREADY THEN SET JWT TO REFRESH TOKEN
  useEffect(() => {
    if (isExpired && jwt) {
      setJwt(cookies.refresh_token);
    }
  }, [isExpired, cookies.refresh_token]);

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
      <Routes>
        {!isExpired ? (
          <Route
            path="/"
            element={
              <Context.Provider value={{ state, dispatch }}>
                <Home />
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
