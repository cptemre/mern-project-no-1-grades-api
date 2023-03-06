import React, { useState, useEffect, useContext } from "react";

// COMPONENTS
import { Context } from "../../../../data/Context";

// NPMS
import $ from "jquery";
import { useSearchParams } from "react-router-dom";

// HOOKS
import useFetch from "../../../../hooks/useFetch";

// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronDown, faCirclePlus);

const CreateLesson = () => {
  // STATE
  const { state, dispatch } = useContext(Context);

  // NEW LESSON
  const [isFetch, setIsFetch] = useState(false);

  // INPUT VALUE
  const [value, setValue] = useState("");
  // QUERY
  const [searchParams, setSearchParams] = useSearchParams();
  // FETCH VARS
  const [fetchVars, setFetchVars] = useState({
    url: "",
    body: "",
    action: "",
    searchParams: "",
  });

  // CHANGE DIV TO INPUT
  const clickHandle = (e) => {
    const target = e.currentTarget;
    $("#newLessonName").css("opacity", 1);
    $(target)
      .siblings("input")
      .css({
        display: "initial",
        fontSize: "1rem",
        color: "var(--inputBorder)",
      })
      .focus();
    $(target).css("display", "none");
    setValue("");
  };

  // CHANGE INPUT TO DIV
  const blurHandle = (e) => {
    const target = e.currentTarget;
    $("#newLessonName").css("opacity", 0.6);
    $(target).siblings("div").css("display", "grid");
    $(target).css("display", "none");
  };

  const iconClickHandle = () => {
    setFetchVars({
      url: state.url.lessons,
      body: { lesson: value, semester: searchParams.get("semester") },
      action: "post",
    });
    dispatch({ type: "IS_FETCH", payload: !state.isFetch });
  };
  // AXIOS CALL
  useFetch(
    fetchVars.url,
    fetchVars.body,
    fetchVars.action,
    fetchVars.searchParams,
    state.isFetch
  );
  return (
    <>
      <article className="lessons" id="newLesson">
        <div className="lessonDiv" id="newLessonAdd">
          <div className="lessonName" id="newLessonName">
            <input
              className="tdInput"
              type="text"
              value={value}
              name="lesson"
              placeholder="ADD A NEW LESSON"
              onBlur={(e) => blurHandle(e)}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div id="newLessonIconDiv">
            <FontAwesomeIcon
              icon="fa-solid fa-circle-plus"
              className="icon"
              id="newLessonIcon"
              onClick={(e) => iconClickHandle(e)}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export default CreateLesson;
