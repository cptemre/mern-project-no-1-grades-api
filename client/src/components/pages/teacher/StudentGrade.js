import React, { useContext, useEffect, useState } from "react";

// COMPONENTS
import { Context } from "../../../data/Context";
import Loading from "../../loading/Loading";
import NoData from "../../../errors/NoData";
// NPMS
import $ from "jquery";
import { useSearchParams } from "react-router-dom";

// HOOKS
import useFetch from "../../../hooks/useFetch";
import useLoad from "../../../hooks/useLoad";

const StudentGrade = () => {
  const { state } = useContext(Context);
  // IS DATA LOADED ?
  const isLoad = useLoad();
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

  // IN THE BEGINNING COMPONENT IS EMPTY
  useEffect(() => {
    $(".studentsDiv").css("display", "none");
  }, []);

  useEffect(() => {
    if (searchParams.get("lesson")) {
      const temp = searchParams.get("lesson").replace(/_/g, " ");
      setLesson(temp);
    }
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
  console.log("a");
  return (
    <section className="studentsDiv">
      {state.studentData ? (
        state.studentData.map((student) => {
          let grade;
          student.lessons.map((lessonObj) => {
            if (lessonObj.lesson === lesson && lessonObj.grade) {
              grade = lessonObj.grade;
            }
          });
          return (
            <div key={student.name + student.surname + lesson}>
              {grade && (
                <article className="studentDiv" id={student._id}>
                  <div className="studentName">
                    {student.name} {student.surname}
                  </div>
                  <div className="studentGrade">
                    <div
                      className="gradeDiv"
                      onClick={(e) => clickHandle(e)}
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
              )}
            </div>
          );
        })
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default StudentGrade;
