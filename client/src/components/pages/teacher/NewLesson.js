import React, { useState, useEffect, useContext } from "react";

// COMPONENTS
import { Context } from "../../../data/Context";

// NPMS
import $ from "jquery";
import { useSearchParams } from "react-router-dom";

// HOOKS
import useFetch from "../../../hooks/useFetch";

// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronDown, faCirclePlus);

const NewLesson = () => {
  // STATE
  const { state } = useContext(Context);

  // NEW LESSON
  const [isNewLesson, setIsNewLesson] = useState(false);

  // INPUT VALUE
  const [value, setValue] = useState("");

  // QUERY
  const [searchParams, setSearchParams] = useSearchParams();
  // SHOULD I FETCH?
  const [isFetch, setIsFetch] = useState(true);
  // FETCH VARS
  const [fetchVars, setFetchVars] = useState({
    url: "",
    body: "",
    action: "",
  });

  // CHANGE DIV TO INPUT
  const clickHandle = (e) => {
    const target = e.target;
    const className = $(target).parent().attr("class");
    const html = $(target).html();
    $(target).siblings("input").css("display", "initial").focus();
    $(target).css("display", "none");
    setValue("");
  };

  // CHANGE INPUT TO DIV
  const blurHandle = (e) => {
    const target = e.target;
    const value = e.target.value;
    const name = "lesson";
    console.log(state.teachersData);
    setFetchVars({
      url: `${state.url.teachers}/${searchParams.get("_id")}`,
      body: { [name]: value },
      action: "post",
    });
    setIsFetch(!isFetch);

    $(target).siblings("div").css("display", "grid");
    $(target).css("display", "none");
    // setValue("");
  };

  const iconClickHandle = () => {
    const semester = $("#selectedSemester").html();
    setFetchVars({
      url: state.url.lessons,
      body: { lesson: value, semester },
      action: "post",
    });
  };
  // AXIOS CALL
  useFetch(
    fetchVars.url,
    fetchVars.body,
    fetchVars.action,
    fetchVars.searchParams,
    isFetch
  );
  return (
    <article className="lessons" id="newLesson">
      <div className="lessonDiv" id="newLessonAdd">
        <div
          className="lessonName newLessonName"
          style={{ visibility: !isNewLesson ? "hidden" : "visible" }}
        >
          <div className="nameDiv" onClick={(e) => clickHandle(e)}>
            ----
          </div>
          <input
            className="tdInput"
            type="text"
            value={value}
            name="lesson"
            onBlur={(e) => blurHandle(e)}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        {!isNewLesson ? (
          <>
            <div id="newLessonIconDiv">
              <FontAwesomeIcon
                icon="fa-solid fa-circle-plus"
                className="icon newLessonIcon"
                onClick={() => setIsNewLesson(!isNewLesson)}
              />
            </div>
          </>
        ) : (
          <>
            <div
              className="slideDown newLessonIconsDiv"
              onClick={(e) => iconClickHandle(e)}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-circle-plus"
                className="icon newLessonIcon"
              />
            </div>
          </>
        )}
      </div>
    </article>
  );
};

export default NewLesson;
