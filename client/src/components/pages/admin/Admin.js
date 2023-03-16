import React, { useEffect, useState, useContext } from "react";

// COMPONENTS
import { Context } from "../../../data/Context";
import Loading from "../../loading/Loading";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";
import TableData from "./TableData";
import Lessons from "./lessons/Lessons";
import Student from "../student/Student";

// HOOKS
import useFetch from "../../../hooks/useFetch";
import useComponent from "../../../hooks/useComponent";
import useNavbar from "../../../hooks/useNavbar";

// NPMS
import WrongPage from "../../../errors/WrongPage";

const Admin = () => {
  // STATE
  const { state, dispatch } = useContext(Context);
  // IF SUB LINK NOT DECIDED THEN AUTO START FOR ADMIN IS FROM TEACHERS
  const component = useComponent();
  return (
    <>
      {component === "teachers" || component === "students" ? (
        <section
          id="table"
          onClick={() => dispatch({ type: "IS_NAVBAR", payload: false })}
        >
          <Search />
          <TableData />
          <Pagination />
        </section>
      ) : component === "lessons" || component === "teacher" ? (
        <Lessons />
      ) : component === "student" ? (
        <Student />
      ) : (
        <Student />
      )}
    </>
  );
};

export default Admin;
