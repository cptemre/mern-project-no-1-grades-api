import React, { useContext,useEffect } from "react";
// COMPONENTS
import Navbar from "../navbar/Navbar";
import Header from "../header/Header";
import Teachers from "./Teachers";
import Login from "../Login";
import { Context } from "../Context";

// HOOKS
import usePost from "../../hooks/usePost";
import useRedirect from "../../hooks/useRedirect";
import useAuth from "../../hooks/useAuth";

// NPMS
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Home = () => {
  const { state } = useContext(Context);
  const [cookies, setCookie] = useCookies(["isAuth"]);
  const navigate = useNavigate()
  usePost();
  useAuth()
  return <>
    {cookies.isAuth === 'true' ? <section id="home">
      <Navbar />
      <Header />
      <Teachers />
    </section> : 'a'}
  </>
};

export default Home;
