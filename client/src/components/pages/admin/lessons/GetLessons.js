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

const GetLessons = () => {
  // STATE
  const { state } = useContext(Context);
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

  console.log(state.isFetch);
  console.log(state.lessonsData);

  // AXIOS CALL
  useFetch(
    fetchVars.url,
    fetchVars.body,
    fetchVars.action,
    fetchVars.searchParams,
    state.isFetch
  );
  const clickHandle = (e) => {};
  return (
    <>
      {state.lessonsData &&
        state.selectedSemester &&
        state.lessonsData.map((lessons) => {
          const { lesson, semester } = lessons;
          if (semester == state.selectedSemester) {
            return (
              <article className="lessons" key={lesson + semester}>
                <div className="lessonDiv">
                  <div className="lessonName">{lesson}</div>
                  <div
                    className="slideDown"
                    onMouseEnter={(e) =>
                      $(e.target).children().css("color", "white")
                    }
                    onMouseLeave={(e) =>
                      $(e.target).children().css("color", "black")
                    }
                    onClick={(e) => clickHandle(e)}
                  >
                    <FontAwesomeIcon
                      icon="fa-chevron-down"
                      className="icon downIcon"
                    />
                  </div>
                </div>
                {/* <StudentGrade /> */}
              </article>
            );
          }
        })}
    </>
  );
};

export default GetLessons;
