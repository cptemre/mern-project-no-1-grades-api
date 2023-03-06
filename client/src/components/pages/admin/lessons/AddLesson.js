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

const AddLesson = () => {
  // STATE
  const { state, dispatch } = useContext(Context);

  // NEW LESSON
  const [isFetch, setIsFetch] = useState(false);

  // INPUT VALUE
  const [value, setValue] = useState("");
  // QUERY
  const [searchParams, setSearchParams] = useSearchParams();
  // RECOMMENDED LESSON
  const [recommendedLessons, setRecommendedLessons] = useState([]);
  // RECOMMENDED LESSON COUNT
  const [recommendedLessonsCount, setRecommendedLessonsCount] = useState([
    0, 1, 2,
  ]);
  // FETCH VARS
  const [fetchVars, setFetchVars] = useState({
    url: "",
    body: "",
    action: "",
    searchParams: "",
  });

  // KEYDOWN HANDLE
  const keyDownHandle = (e) => {
    setFetchVars({
      url: state.url.lessons,
      body: "",
      action: "get",
    });
    dispatch({ type: "IS_FETCH", payload: !state.isFetch });
  };

  // REGEX THE DATA FROM STATE
  useEffect(() => {
    if (state.lessonsData) {
      const lessonReg = new RegExp(value, "i");
      const filteredLessons = state.lessonsData.filter((exampleLesson) => {
        if (
          exampleLesson.lesson.match(lessonReg) &&
          searchParams.get("semester") == exampleLesson.semester
        ) {
          return exampleLesson;
        }
      });
      setRecommendedLessons(filteredLessons);
    }
  }, [state.lessonsData]);

  // RECOMMEND LESSON CLICK HANDLE TO ADD IT TO TEACHER
  const recommendClick = (lessonID, lesson, semester) => {
    let updatedTeacher = state.teachersData;
    if (updatedTeacher.branches) {
      const isUnique = updatedTeacher.branches.every((branch) => {
        return !updatedTeacher.branches._id == lessonID;
      });
      if (isUnique) {
        updatedTeacher.branches.push({ _id: lessonID, lesson, semester });
      }
    }
    console.log(updatedTeacher);
    setFetchVars({
      url: `${state.url.teachers}/${searchParams.get("_id")}`,
      body: { ...updatedTeacher },
      action: "patch",
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
        <div className="lessonDiv addLesson" id="newLessonAdd">
          <div className="lessonName" id="newLessonName">
            <input
              className="tdInput"
              id="newLessonInput"
              type="text"
              value={value}
              name="lesson"
              placeholder="ADD A NEW LESSON"
              onBlur={(e) => $("#newLessonInput").css("opacity", 0.7)}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => keyDownHandle(e)}
            />
            {value && (
              <div id="lessonDiv">
                {recommendedLessons.length < 3
                  ? recommendedLessons.map((recommend) => {
                      const { _id, lesson, semester } = recommend;
                      return (
                        <div
                          className="recommendedLessons"
                          key={_id}
                          id={_id}
                          onClick={() => recommendClick(_id, lesson, semester)}
                        >
                          {lesson}
                        </div>
                      );
                    })
                  : recommendedLessonsCount.map((number) => (
                      <div
                        className="recommendedLessons"
                        key={recommendedLessons[number]._id}
                        id={recommendedLessons[number]._id}
                        onClick={(e) =>
                          recommendClick(
                            recommendedLessons[number]._id,
                            recommendedLessons[number].lesson,
                            recommendedLessons[number].semester
                          )
                        }
                      >
                        {recommendedLessons[number].lesson}
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default AddLesson;
