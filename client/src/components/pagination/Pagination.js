import React, { useState, useEffect, useContext } from "react";

// COMPONENTS
import { Context } from "../../data/Context";

// HOOKS
import useFetch from "../../hooks/useFetch";
import useComponent from "../../hooks/useComponent";

// NPMS
import { useSearchParams } from "react-router-dom";

// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSquareCaretLeft,
  faSquareCaretRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(faSquareCaretLeft, faSquareCaretRight);

const Pagination = () => {
  // STATE
  const { state } = useContext(Context);
  // COMPONENT
  const component = useComponent();
  // USESEARCHPARAMS
  const [searchParams, setSearchParams] = useSearchParams();
  // FETCH VARIABLES
  const [fetchVars, setFetchVars] = useState({
    url: "",
    body: "",
    action: "",
    searchParams,
  });
  // PAGE LENGTH
  const [lastPage, setLastPage] = useState("");
  // SELECTED PAGE
  const [selectedPage, setSelectedPage] = useState(1);
  useEffect(() => {
    if (component) {
      setFetchVars({
        url: state.url[component + "Length"],
        body: "",
        action: "get",
        searchParams,
      });
    }
  }, [component, searchParams]);

  useEffect(() => {
    if (searchParams.get("pageValue")) {
      setSelectedPage(Number(searchParams.get("pageValue")));
    } else {
      setSelectedPage(1);
    }
  }, [searchParams]);

  useEffect(() => {
    // setLastPage(state[`${component}Length`] / 10 + 1);
    setLastPage(10);
  }, [state[`${component}Length`]]);

  // AXIOS CALL
  useFetch(
    fetchVars.url,
    fetchVars.body,
    fetchVars.action,
    fetchVars.searchParams
  );
  return (
    <section id="paginationSection">
      <article id="leftContainer">
        <FontAwesomeIcon icon="fa-solid fa-square-caret-left" />
      </article>
      <article id="numbers">
        {selectedPage !== 1 && <div className="numbers">1</div>}
        <div id="earlierPageContainer">
          {selectedPage - 2 > 2 ? (
            <>
              <div className="dots">...</div>
              <div className="numbers">{selectedPage - 2}</div>
              <div className="numbers">{selectedPage - 1}</div>
            </>
          ) : selectedPage - 2 > 1 ? (
            <>
              <div className="numbers">{selectedPage - 2}</div>
              <div className="numbers">{selectedPage - 1}</div>
            </>
          ) : (
            selectedPage - 2 > 0 && (
              <>
                <div className="numbers">{selectedPage - 1}</div>
              </>
            )
          )}
        </div>
        {selectedPage && <div className="numbers">{selectedPage}</div>}
        <div id="furtherPageContainer">
          {selectedPage + 2 <= lastPage ? (
            <>
              <div className="numbers">{selectedPage + 1}</div>
              <div className="numbers">{selectedPage + 2}</div>
            </>
          ) : (
            selectedPage + 1 <= lastPage && (
              <>
                <div className="numbers">{selectedPage + 1}</div>
              </>
            )
          )}
        </div>

        {lastPage > selectedPage + 3 && <div className="dots">...</div>}
        {lastPage > selectedPage + 2 && (
          <div className="numbers">{lastPage}</div>
        )}
      </article>
      <article id="rightContainer">
        <FontAwesomeIcon icon="fa-solid fa-square-caret-right" />
      </article>
    </section>
  );
};

export default Pagination;
