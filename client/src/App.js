import React, { useReducer, useEffect, useState } from "react";
// * COMPONENTS
// NAVBAR
import Navbar from "./components/navbar/Navbar";
import Login from "./components/Login";
import { Context } from "./components/Context";
// * DATA
import { reducer, defaultState } from "./data/reducer";
// * ROUTER
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

const App = () => {
  // * REDUCER SETUP
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [jwt, setJwt] = useState("");
  return (
    <Router>
      {jwt && (
        <Context.Provider value={{ state }}>
          <Navbar />
        </Context.Provider>
      )}
      <Routes>
        <Route
          path="/"
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
