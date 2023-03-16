import React, { useContext, useState, useEffect } from "react";

// COMPONENTS
import WrongPage from "../../../errors/WrongPage";
import { Context } from "../../../data/Context";
import Semester from "../teacher/Semester";
import Lessons from "./Lessons";
// HOOKS
import useFetch from "../../../hooks/useFetch";
import useComponent from "../../../hooks/useComponent";
import useNavbar from "../../../hooks/useNavbar";

const Student = () => {
  // STATE
  const { state } = useContext(Context);
  // COMPONENT
  const component = useComponent();
  useNavbar(component);
  // FETCH VARS
  const [fetchVars, setFetchVars] = useState({
    url: "",
    body: "",
    action: "",
    searchParams: "",
  });

  useEffect(() => {
    if (component) {
      setFetchVars({
        url: `${state.url.students}/${state.ID}`,
        body: "",
        action: "get",
      });
    }
  }, [state.url, component, state.ID]);
  // AXIOS CALL
  useFetch(fetchVars.url, fetchVars.body, fetchVars.action);

  return (
    <>
      {component !== "grades" &&
      component !== "account" &&
      component !== "student" ? (
        <WrongPage />
      ) : (
        <section id="teacherSection">
          <Semester />
          <Lessons />
        </section>
      )}
    </>
  );
};

export default Student;
