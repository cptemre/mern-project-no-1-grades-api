import React, { useContext, useState, useEffect } from "react";

// COMPONENTS
import WrongPage from "../../errors/WrongPage";
import NoData from "../../errors/NoData";
import Loading from "../loading/Loading";
import { Context } from "../../data/Context";

// NPMS
import { useParams } from "react-router-dom";

// HOOKS
import useLoad from "../../hooks/useLoad";
import useComponent from "../../hooks/useComponent";

const Teacher = () => {
  // STATE
  const { state, dispatch } = useContext(Context);
  // PARAMS
  const { component } = useParams();
  // IS LOAD
  const isLoad = useLoad();

  // TODO - ADD FUNCTION ON COMPONENT CLICK HIDE NAVBAR FROM STATE ISNAVBAR
  // TODO - ADD LOADING FUNCTION

  return (
    <>
      {component !== "teachers" && component !== "students" ? (
        <WrongPage />
      ) : !state.data && !isLoad ? (
        <Loading />
      ) : !state.data ? (
        <NoData />
      ) : (
        "a"
      )}
    </>
  );
};

export default Teacher;
