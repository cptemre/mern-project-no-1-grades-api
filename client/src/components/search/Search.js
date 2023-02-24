import React, { useState } from "react";

// NPMS
import { useSearchParams } from "react-router-dom";
import $ from "jquery";
const Search = () => {
  // INPUT VALUE
  const [value, setValue] = useState("");

  // SEARCH PARAM
  const [searchParams, setSearchParams] = useSearchParams();

  const searchOptions = ["NAME", "SURNAME", "EMAIL", "DATE"];

  const clickHandle = (e) => {
    const target = e.target;
    const key = $(target).html().toLowerCase();
    setSearchParams((searchParams) => {
      searchParams.set([key], value);
      return searchParams;
    });
  };

  return (
    <div id="searchDiv">
      <div id="searchOptions">
        {searchOptions.map((option) => (
          <div
            className="searchOption"
            key={option + "SearchOption"}
            onClick={(e) => clickHandle(e)}
          >
            {option}
          </div>
        ))}
        {searchOptions.map((param,i) => (
          <div
            className="params"
            key={param + i}
            onClick={(e) => clickHandle(e)}
          >
            
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
        <button>SEARCH</button>
      </div>
    </div>
  );
};

export default Search;
