import React, { useState, useContext, useEffect } from "react";

// * COMPONENTS
// CONTEXT
import { Context } from "../../data/Context";
import $ from "jquery";
import { useParams } from "react-router-dom";
// NPMS
import { useNavigate } from "react-router-dom";

const Options = () => {
  const { state } = useContext(Context);
  // PARAM
  const { component } = useParams();
  // NAVIGATE
  const navigate = useNavigate();
  const [options, setOptions] = useState({
    admin: ["TEACHERS", "STUDENTS"],
    teacher: ["MY LESSONS", "a"],
  });

  // OPTION FUNCTIONS
  const mouseenterHandle = (e) => {
    const html = $(e.target).html().toLowerCase();
    if (component !== html) {
      $(e.target).css({
        backgroundColor: "var(--inputBorder)",
        color: "white",
        transform: "translateX(-3px)",
      });
    }
  };
  const mouseleaveHandle = (e) => {
    const html = $(e.target).html().toLowerCase();
    if (component !== html) {
      $(e.target).css({
        backgroundColor: "var(--optionBg)",
        color: "black",
        transform: "translateX(-10px)",
      });
    }
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
            onClick={() => navigate(`/${option.toLowerCase()}`)}
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
