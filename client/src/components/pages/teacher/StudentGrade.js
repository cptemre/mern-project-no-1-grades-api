import React, { useContext, useEffect, useState } from "react";

// COMPONENTS
import { Context } from "../../../data/Context";

// NPMS
import $ from "jquery";
import { useSearchParams } from "react-router-dom";

// HOOKS
import useFetch from "../../../hooks/useFetch";

const StudentGrade = () => {
  const { state } = useContext(Context);

  // INPUT VALUE
  const [value, setValue] = useState("");
  const [lesson, setLesson] = useState("");
  // QUERY
  const [searchParams, setSearchParams] = useSearchParams();
  // SHOULD I FETCH?
  const [isFetch, setIsFetch] = useState(false);
  // FETCH VARS
  const [fetchVars, setFetchVars] = useState({
    url: "",
    body: "",
    action: "",
    searchParams: "",
  });

  useEffect(() => {
    const temp = searchParams.get("lesson").replace(/_/g, " ");
    setLesson(temp);
  }, [searchParams]);

  // CHANGE DIV TO INPUT
  const clickHandle = (e) => {
    const target = e.target;
    const html = $(target).html();
    $(target).siblings("input").css("display", "initial").focus();
    $(target).css("display", "none");
    if ($(target).html() === "----") {
      setValue("");
    } else {
      setValue(html);
    }
  };
  // CHANGE INPUT TO DIV
  const blurHandle = (e) => {
    const target = e.target;
    const value = e.target.value;
    const name = e.target.name;
    const _id = $(target).parent().parent().attr("id");
    const filtered = state.studentData.filter((student) => student._id == _id);
    const update = filtered[0].lessons.map((a) => {
      console.log(a);
      if (a.lesson === lesson) {
        a.grade = value;
      }
      return a;
    });
    setFetchVars({
      url: `${state.url.students}/${_id}`,
      body: { update, _id },
      action: "patch",
      searchParams: "",
    });
    setIsFetch(!isFetch);

    $(target).siblings("div").css("display", "grid");
    $(target).css("display", "none");
    setValue("");
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
    <section className="studentsDiv">
      <article id="addStudent"></article>
      <article id="addNewStudent"></article>
      {state.studentData &&
        state.studentData.map((student, i) => {
          let grade;
          student.lessons.map((lessonObj) => {
            if (lessonObj.lesson === lesson && lessonObj.grade) {
              console.log(true);

              grade = lessonObj.grade;
            }
          });
          return (
            <article key={i} className="studentDiv" id={student._id}>
              <div className="studentName">
                {student.name} {student.surname}
              </div>
              <div className="studentGrade">
                <div className="gradeDiv" onClick={(e) => clickHandle(e)}>
                  {grade !== undefined ? grade : "----"}
                </div>
                <input
                  className="tdInput"
                  type="number"
                  value={value}
                  name="grade"
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={(e) => blurHandle(e)}
                />
              </div>
            </article>
          );
        })}
    </section>
  );
};

export default StudentGrade;
