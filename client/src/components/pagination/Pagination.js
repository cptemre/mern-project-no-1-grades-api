import React, { useState, useEffect, useContext } from "react";

// COMPONENTS
import { Context } from "../../data/Context";

// HOOKS
import useFetch from "../../hooks/useFetch";
import useComponent from "../../hooks/useComponent";

// NPMS
import { useSearchParams } from "react-router-dom";
import $ from "jquery";

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
  const { state, dispatch } = useContext(Context);
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
  }, [component, searchParams, state.isFetch]);

  useEffect(() => {
    if (searchParams.get("pageValue")) {
      setSelectedPage(Number(searchParams.get("pageValue")));
    } else {
      setSelectedPage(1);
    }
  }, [searchParams]);

  useEffect(() => {
    setLastPage(state[`${component}Length`] / 10 + 1);
  }, [state[`${component}Length`]]);

  // ARROWS FUNCTIONS TO SET SEARCH PARAMS
  const leftArrowClickHandle = () => {
    if (selectedPage != 1) {
      setSearchParams((searchParams) => {
        searchParams.set("pageValue", selectedPage - 1);
        return searchParams;
      });
    }
  };
  const rightArrowClickHandle = () => {
    if (selectedPage != lastPage) {
      setSearchParams((searchParams) => {
        searchParams.set("pageValue", selectedPage + 1);
        return searchParams;
      });
    }
  };

  // NUMBERS FUNCTION TO SET SEARCH PARAMS
  const numbersHandle = (e) => {
    const value = $(e.currentTarget).html();
    dispatch({ type: "IS_LOADING", payload: true });
    setSearchParams((searchParams) => {
      searchParams.set("pageValue", value);
      return searchParams;
    });
  };

  // AXIOS CALL
  useFetch(
    fetchVars.url,
    fetchVars.body,
    fetchVars.action,
    fetchVars.searchParams
  );
  return (
    <section id="paginationSection">
      <article
        id="leftContainer"
        className="buttonIcons"
        onClick={() => leftArrowClickHandle()}
        style={{
          opacity: selectedPage == 1 && "0.5",
          color: selectedPage == 1 && "white",
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-square-caret-left" id="leftIcon" />
      </article>
      <article id="numbers">
        {selectedPage !== 1 && (
          <div className="numbers" onClick={(e) => numbersHandle(e)}>
            1
          </div>
        )}
        {selectedPage - 2 > 2 && <div className="dots">...</div>}
        {selectedPage - 2 > 1 && (
          <div className="numbers" onClick={(e) => numbersHandle(e)}>
            {selectedPage - 2}
          </div>
        )}
        {selectedPage - 2 > 0 && (
          <div className="numbers" onClick={(e) => numbersHandle(e)}>
            {selectedPage - 1}
          </div>
        )}
        {selectedPage && (
          <div
            className="numbers"
            id="selectedPage"
            onClick={(e) => numbersHandle(e)}
          >
            {selectedPage}
          </div>
        )}
        {selectedPage + 2 <= lastPage && (
          <>
            <div className="numbers" onClick={(e) => numbersHandle(e)}>
              {selectedPage + 1}
            </div>
          </>
        )}
        {selectedPage + 1 <= lastPage && (
          <>
            <div className="numbers" onClick={(e) => numbersHandle(e)}>
              {selectedPage + 2}
            </div>
          </>
        )}
        {lastPage > selectedPage + 3 && <div className="dots">...</div>}
        {lastPage > selectedPage + 2 && (
          <div
            className="numbers"
            id="lastPage"
            onClick={(e) => numbersHandle(e)}
          >
            {lastPage}
          </div>
        )}
      </article>
      <article
        id="rightContainer"
        className="buttonIcons"
        onClick={() => rightArrowClickHandle()}
        style={{
          opacity: selectedPage == lastPage && "0.5",
          color: selectedPage == lastPage && "white",
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-square-caret-right" id="rigthIcon" />
      </article>
    </section>
  );
};

export default Pagination;
