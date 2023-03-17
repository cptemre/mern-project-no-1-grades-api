import React, { useContext, useState, useEffect } from "react";

// COMPONENTS
import WrongPage from "../../../errors/WrongPage";
import { Context } from "../../../data/Context";
import Semester from "../teacher/Semester";
import Loading from "../../loading/Loading";
// ERRORS
import NoData from "../../../errors/NoData";

// HOOKS
import useFetch from "../../../hooks/useFetch";
import useComponent from "../../../hooks/useComponent";
import useNavbar from "../../../hooks/useNavbar";

// NPMS
import { useSearchParams } from "react-router-dom";

// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

const Student = () => {
  // STATE
  const { state, dispatch } = useContext(Context);
  // QUERY
  const [searchParams, setSearchParams] = useSearchParams();
  // LESSON IDS
  const [lessonIDs, setLessonIDs] = useState([]);
  // LESSON IDS GRADE
  const [lessonGrade, setLessonGrade] = useState([]);
  // STUDENT FINAL LESSON INFOR
  const [finalLessons, setFinalLessons] = useState([]);
  // FETCH VARS
  const [fetchVars, setFetchVars] = useState({
    url: "",
    body: "",
    action: "",
    searchParams: "",
  });
  console.log(state);
  // SET LESSON ARRAY
  useEffect(() => {
    if (state.studentsData.length) {
      // PUT LESSON IDS TO THIS ARRAY
      let tempLessons = [];
      let tempGrade = [];
      for (let i = 0; i < state.studentsData.lessons.length; i++) {
        if (state.studentsData.lessons[i].lessonID) {
          tempLessons.push(state.studentsData.lessons[i].lessonID);
          tempGrade.push({
            lessonID: state.studentsData.lessons[i].lessonID,
            grade: state.studentsData.lessons[i].grade,
          });
        }
      }
      console.log(state.studentsData);
      setLessonIDs(tempLessons);
      setLessonGrade(tempGrade);
    }
  }, [state.studentsData]);
  console.log(state.studentsData);

  // GET BRANCHESDATA INFORMATION
  useEffect(() => {
    if (lessonIDs.length) {
      setFetchVars({
        url: state.url.branches,
        body: "",
        action: "get",
        searchParams: { branches: lessonIDs },
      });
    }
  }, [lessonIDs]);

  // SET ALL LESSONS OF THE STUDENT HERE
  useEffect(() => {
    console.log("a");
    if (state.branchesData && lessonGrade) {
      let tempArray = [];
      for (let i = 0; i < state.branchesData.length; i++) {
        const tempLesson = state.branchesData[i];
        for (let y = 0; y < lessonGrade.length; y++) {
          if (lessonGrade[y]["lessonID"] === state.branchesData[i]["_id"]) {
            tempLesson.grade = lessonGrade[y]["grade"];
          }
        }
        tempArray.push(tempLesson);
      }
      console.log(tempArray);
      setFinalLessons(tempArray);
    }
  }, [state.branchesData, lessonGrade]);
  // AXIOS CALL
  useFetch(
    fetchVars.url,
    fetchVars.body,
    fetchVars.action,
    fetchVars.searchParams,
    state.isFetch
  );
  console.log(finalLessons);
  const clickHandle = () => {
    dispatch({ type: "IS_SEMESTER", payload: false });
    dispatch({ type: "IS_NAVBAR", payload: false });
  };
  return (
    <article id="studentLessonsContainer" onClick={() => clickHandle()}>
      <section className="studentsDiv" id="studentsDivSection">
        {state.isLoading ? (
          <Loading />
        ) : state.studentsData && !state.isLoading && !state.studentsData ? (
          <NoData />
        ) : (
          finalLessons &&
          finalLessons.map((singleLesson) => {
            const { _id, lesson, semester, grade } = singleLesson;
            if (semester == searchParams.get("semester")) {
              console.log(semester);
              return (
                <div
                  key={_id + lesson + semester + grade}
                  className="studentLessons"
                >
                  {
                    <article className="studentDiv" id={_id}>
                      <div className="studentName">{lesson}</div>
                      <div className="studentGrade">
                        <div
                          className="gradeDiv"
                          style={{
                            backgroundColor: !grade
                              ? "var(--inputBorder)"
                              : grade > 2
                              ? "green"
                              : "red",
                          }}
                        >
                          {grade !== undefined ? grade : "----"}
                        </div>
                      </div>
                    </article>
                  }
                </div>
              );
            }
          })
        )}
      </section>
    </article>
  );
};

export default Student;
