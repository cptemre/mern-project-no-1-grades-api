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
  const { state } = useContext(Context);
  // QUERY
  const [searchParams, setSearchParams] = useSearchParams();
  // FETCH VARS
  const [fetchVars, setFetchVars] = useState({
    url: "",
    body: "",
    action: "",
    searchParams: "",
  });
  console.log(state);
  return (
    <article id="studentLessonsContainer">
      <section className="studentsDiv" id="studentsDivSection">
        {state.isLoading ? (
          <Loading />
        ) : state.studentsData &&
          !state.isLoading &&
          !state.studentsData.length ? (
          <NoData />
        ) : (
          state.studentsData &&
          state.studentsData.map((student) => {
            let grade;
            student.lessons.map((lessonObj) => {
              if (lessonObj.grade) {
                grade = lessonObj.grade;
              }
            });
            return (
              <div key={student.name + student.surname}>
                {
                  <article className="studentDiv" id={student._id}>
                    <FontAwesomeIcon
                      icon="fa-trash"
                      className="icon downIcon"
                    />
                    <div className="studentNo">{student.studentNo}</div>
                    <div className="studentName">
                      {student.name} {student.surname}
                    </div>
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
          })
        )}
      </section>
    </article>
  );
};

export default Student;
