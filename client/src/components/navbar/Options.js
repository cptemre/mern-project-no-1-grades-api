import React, { useState, useContext, useEffect } from "react";

// * COMPONENTS
// CONTEXT
import { Context } from "../../data/Context";
import $ from "jquery";
import { useParams } from "react-router-dom";
// NPMS
import { useNavigate } from "react-router-dom";

const Options = () => {
  const { state, dispatch } = useContext(Context);
  // PARAM
  const { component } = useParams();
  // NAVIGATE
  const navigate = useNavigate();
  const [options, setOptions] = useState({
    admin: ["TEACHERS", "STUDENTS", "LESSONS"],
    teacher: ["LESSONS"],
    student: ["GRADES"],
  });

  // OPTION FUNCTIONS
  const mouseenterHandle = (e) => {
    const html = $(e.currentTarget).html().toLowerCase();
    if (component !== html) {
      $(e.currentTarget).css({
        backgroundColor: "var(--inputBorder)",
        color: "white",
        transform: "translateX(-3px)",
      });
    }
  };
  const mouseleaveHandle = (e) => {
    const html = $(e.currentTarget).html().toLowerCase();
    if (
      component !== html &&
      component !== "student" &&
      component !== "teacher"
    ) {
      $(e.currentTarget).css({
        backgroundColor: "var(--optionBg)",
        color: "black",
        transform: "translateX(-10px)",
      });
    }
  };
  const clickHandle = (option, e) => {
    $(".option").css({
      backgroundColor: "var(--optionBg)",
      color: "black",
      transform: "translateX(-10px)",
    });
    $(e.currentTarget).css({
      backgroundColor: "var(--inputBorder)",
      color: "white",
      transform: "translateX(-3px)",
    });
    let tempParams = { NAME: "", SURNAME: "", EMAIL: "", CREATEDAT: "" };
    dispatch({ type: "SEARCH_OPTIONS", payload: tempParams });
    navigate(`/${option.toLowerCase()}`);
  };
  // ACCORDING TO STATE TITLE RETURN OPTIONS FROM OPTIONS VARIABLE WITH KEY
  return (
    <section id="options">
      {state.title &&
        options[state.title].map((option, i) => (
          <article
            id={option.toLowerCase() + "Option"}
            className="option"
            key={option + i}
            onClick={(e) => clickHandle(option, e)}
            onMouseEnter={(e) => mouseenterHandle(e)}
            onMouseLeave={(e) => mouseleaveHandle(e)}
          >
            {option}
          </article>
        ))}
    </section>
  );
};

export default Options;
