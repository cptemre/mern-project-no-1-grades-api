import React, { useState, useEffect, useContext } from "react";

// COMPONENTS
import { Context } from "../../../../data/Context";
import Loading from "../../../loading/Loading";

// ERRORS
import NoData from "../../../../errors/NoData";

// NPMS
import $ from "jquery";
import { useSearchParams } from "react-router-dom";

// HOOKS
import useFetch from "../../../../hooks/useFetch";

// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronDown,
  faCirclePlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

library.add(faChevronDown, faCirclePlus, faTrash);

const GetLessons = () => {
  // STATE
  const { state, dispatch } = useContext(Context);
  // INPUT VALUE
  const [value, setValue] = useState("");
  // QUERY
  const [searchParams, setSearchParams] = useSearchParams();
  // FETCH VARS
  const [fetchVars, setFetchVars] = useState({
    url: "",
    body: "",
    action: "",
  });
  // GET LESSONS
  useEffect(() => {
    setFetchVars({
      url: state.url.lessons,
      body: "",
      action: "get",
    });
  }, [state.url, state.isFetch]);

  // ICON FUNCTIONS
  const getLessonMouseEnter = (e) => {
    if (state.title === "admin") {
      $(e.currentTarget).css("backgroundColor", "red");
      $(e.currentTarget).children(".icon").css("color", "var(--optionBg)");
    }
    if (state.title === "teacher") {
      $(e.currentTarget).css("backgroundColor", "var(--inputBorder)");
      $(e.currentTarget).children(".icon").css("color", "var(--optionBg)");
    }
  };
  const getLessonMouseLesson = (e) => {
    $(e.currentTarget).css("backgroundColor", "var(--optionBg)");
    $(e.currentTarget).children(".icon").css("color", "black");
  };

  // AXIOS CALL
  useFetch(
    fetchVars.url,
    fetchVars.body,
    fetchVars.action,
    fetchVars.searchParams,
    state.isFetch
  );

  // DELETE LESSON
  const clickHandle = (e) => {
    const _id = $(e.currentTarget).parent().parent().attr("id");
    if (state.title === "admin") {
      setFetchVars({
        url: `${state.url.lessons}/${_id}`,
        body: "",
        action: "delete",
      });
      dispatch({ type: "IS_FETCH", payload: !state.isFetch });
    }
  };

  // CHANGE DIV TO INPUT
  const updateLesson = (e) => {
    const target = e.currentTarget;
    const html = $(target).html();
    $(target).siblings("input").css("display", "initial").focus();
    $(target).css("display", "none");
    setValue(html);
  };
  // CHANGE INPUT TO DIV
  const blurHandle = (e) => {
    const target = e.target;
    const name = e.target.name;
    const _id = $(target).parent().parent().parent().attr("id");
    setFetchVars({
      url: `${state.url.lessons}/${_id}`,
      body: { [name]: value },
      action: "patch",
    });
    $(target).siblings("div").css("display", "grid");
    $(target).css("display", "none");
    setValue("");
    dispatch({ type: "IS_FETCH", payload: !state.isFetch });
  };
  return (
    <>
      {state.isLoading ? (
        <Loading />
      ) : state.lessonsData && !state.isLoading && !state.lessonsData.length ? (
        <NoData />
      ) : (
        state.lessonsData &&
        state.selectedSemester &&
        state.lessonsData.map((lessons) => {
          const { lesson, semester, _id } = lessons;
          if (semester == state.selectedSemester) {
            return (
              <article className="lessons" key={_id} id={_id}>
                <div className="lessonDiv">
                  <div className="lessonName">
                    <div className="nameDiv" onClick={(e) => updateLesson(e)}>
                      {lesson}
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
                  <div
                    className="slideDown"
                    onMouseEnter={(e) => getLessonMouseEnter(e)}
                    onMouseLeave={(e) => getLessonMouseLesson(e)}
                    onClick={(e) => clickHandle(e)}
                  >
                    <FontAwesomeIcon
                      icon={
                        state.title === "admin" ? "fa-trash" : "fa-chevron-down"
                      }
                      className="icon downIcon"
                    />
                  </div>
                </div>
                {/* <StudentGrade /> */}
              </article>
            );
          }
        })
      )}
    </>
  );
};

export default GetLessons;
