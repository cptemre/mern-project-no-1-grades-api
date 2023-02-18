import React, {useContext} from "react";
// COMPONENTS
import Navbar from "../navbar/Navbar";
import Header from "../header/Header";
import Teachers from "./Teachers";
import { Context } from "../Context";

const Home = () => {
  const {state} = useContext(Context)
  return (
    <section id="home">
      <Navbar />
      <Header />
      <Teachers />
    </section>
  );
};

export default Home;
