import React, { useState, useContext, useEffect } from "react";

// * COMPONENTS
// CONTEXT
import { Context } from "../../data/Context";

// NPMS
import { useNavigate } from "react-router-dom";

const Options = () => {
  const { state } = useContext(Context);
  // NAVIGATE
  const navigate = useNavigate();
  const [options, setOptions] = useState({
    admin: ["TEACHERS", "STUDENTS"],
    teacher: ['MY LESSONS','a']
  });
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
          >
            {option}
          </article>
        ))}
    </section>
  );
};

export default Options;
