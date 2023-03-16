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
  // GET LESSONS
  useEffect(() => {
    setFetchVars({
      url: state.url.lessons,
      body: "",
      action: "get",
      searchParams: { semester: searchParams.get("semester") },
    });
  }, [state.url, state.isFetch, searchParams]);
  const iconClickHandle = () => {
    setFetchVars({
      url: state.url.lessons,
      body: { lesson: value, semester: searchParams.get("semester") },
      action: "post",
    });
    console.log(searchParams.get("semester"));

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
              id="newLessonInput"
              type="text"
              value={value}
              name="lesson"
              placeholder="ADD A NEW LESSON"
              onBlur={() => $("#newLessonInput").css("opacity", 0.7)}
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
