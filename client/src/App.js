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

// * CSS
// MAIN
import "./css/index.css";

// LOADING
import "./css/loading/loading.css";

// SEARCH
import "./css/search/search.css";

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
import Teachers from "./components/pages/Teachers";

const App = () => {
  // * REDUCER SETUP
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Context.Provider value={{ state, dispatch }}>
              <Home />
            </Context.Provider>
          }
        />
        <Route
          path="/:component"
          element={
            <Context.Provider value={{ state, dispatch }}>
              <Home />
            </Context.Provider>
          }
        />
        <Route
          path="*"
          element={
            <Context.Provider value={{ state, dispatch }}>
              <Login />
            </Context.Provider>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
