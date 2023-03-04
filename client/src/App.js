import React, { useReducer, useEffect, useState } from "react";
// * COMPONENTS
// NAVBAR
import Login from "./components/login/Login";
import Home from "./components/pages/Home";
import { Context } from "./data/Context";
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
import "./css/navbar/navbtn.css";
// USER INFO
import "./css/navbar/userInfo.css";
// OPTIONS
import "./css/navbar/options.css";
// LOGOUT
import "./css/navbar/logout.css";
// PAGES
// HOME
import "./css/pages/home.css";
import "./css/pages/admin.css";
// TEACHER
import "./css/pages/teacher/teacher.css";
import "./css/pages/teacher/semester.css";
import "./css/pages/teacher/studentgrade.css";
// PAGINATION
import "./css/pagination/pagination.css";
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
