import React, { useState, useContext, useEffect } from "react";

// * COMPONENTS
// CONTEXT
import { Context } from "../Context";

const Options = () => {
  const { state } = useContext(Context);
  const [options, setOptions] = useState({
    admin: ["TEACHERS", "STUDENTS"],
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
          >
            {option}
          </article>
        ))}
    </section>
  );
};

export default Options;
