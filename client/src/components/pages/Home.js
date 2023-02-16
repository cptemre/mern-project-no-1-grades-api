import React from 'react'
// COMPONENTS
import Navbar from "../navbar/Navbar";
import Header from "../header/Header";
import Teachers from "./Teachers";

const Home = () => {
  return (
      <section id='home'>
          <Navbar />
          <Header/>
          <Teachers/>
    </section>
  )
}

export default Home