import React, { useState, useContext, useEffect } from "react";

// COMPONENTS
import { Context } from "../../data/Context";

// NPMS
import { useSearchParams } from "react-router-dom";
import $ from "jquery";
const Search = () => {
  // CONTEXT
  const { state, dispatch } = useContext(Context);
  // INPUT VALUE
  const [value, setValue] = useState("");

  // SEARCH PARAM
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let tempParams = { NAME: "", SURNAME: "", EMAIL: "", CREATEDAT: "" };
    searchParams.forEach((value, key) => {
      tempParams[key.toUpperCase()] = value;
    });
    dispatch({ type: "SEARCH_OPTIONS", payload: tempParams });
  }, [searchParams]);

  // ADDS NEW QUERY TO SEARCH
  const clickHandle = (e) => {
    const target = e.target;
    const key = $(target).html();
    // SET QUERY IF THERE IS AN INPUT VALUE
    if (value) {
      setSearchParams((searchParams) => {
        if (key === "DATE") {
          searchParams.set("createdAt", value);
        } else {
          searchParams.set([key.toLowerCase()], value);
        }
        return searchParams;
      });
    }
  };

  const removeHandle = (e) => {
    const html = $(e.target).html();
    const id = e.target.id;
    let tempSearch = state.searchOptions;
    tempSearch[id] = "";
    setSearchParams((searchParams) => {
      if (id === "CREATEDAT") {
        searchParams.delete("createdAt");
      } else {
        searchParams.delete(id.toLowerCase());
      }
      return searchParams;
    });
  };

  return (
    <div id="searchDiv">
      <div id="searchOptions">
        {state.searchOptions &&
          Object.keys(state.searchOptions).map((option) => (
            <div
              className="searchOption"
              key={option + "SearchOption"}
              onClick={(e) => clickHandle(e)}
            >
              {option !== "CREATEDAT" ? option : "DATE"}
            </div>
          ))}
        {state.searchOptions &&
          Object.keys(state.searchOptions).map((option) => (
            <div
              id={option}
              className="searchOption"
              key={option + "SearchOption"}
              onClick={(e) => removeHandle(e)}
            >
              {state.searchOptions[option]}
            </div>
          ))}
      </div>
      <div id="search">
        <input
          value={value}
          type="text"
          id="searchInput"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
