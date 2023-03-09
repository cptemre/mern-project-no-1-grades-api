import React, { useState, useEffect, useContext } from "react";

// COMPONENTS
import { Context } from "../../../data/Context";

// NPMS
import $ from "jquery";
import { useSearchParams } from "react-router-dom";

// HOOKS
import useFetch from "../../../hooks/useFetch";

const NewStudent = () => {
  // STATE
  const { state, dispatch } = useContext(Context);
  // QUERY
  const [searchParams, setSearchParams] = useSearchParams();
  // SELECTED LESSONID
  const [selectedLessonID, setSelectedLessonID] = useState("");
  // SELECTED TEACHERID
  const [selectedTeacherID, setSelectedTeacherID] = useState("");
  // FETCH VARS
  const [fetchVars, setFetchVars] = useState({
    url: "",
    body: "",
    action: "",
    searchParams: "",
  });
  // VALUE
  const [value, setValue] = useState("");
  // NUMBERS TO ITERATE
  const [iterateNums, setIterateNums] = useState([0, 1, 2]);
  // RECOMMEND STUDENTS
  const [recommendStudents, setRecommendStudents] = useState([]);
  const keyDownHandle = (e) => {
    const studentNo = e.currentTarget.value;
    $("#studentName").html("ENTER A STUDENT NUMBER");
    setFetchVars({
      url: state.url.students + `/studentNo`,
      body: "",
      action: "get",
      searchParams: { studentNo },
    });
  };

  useEffect(() => {
    if (state.studentNoData) {
      setRecommendStudents(state.studentNoData);
    }
  }, [state.studentNoData]);

  // INPUT BLUR HANDLE
  const blurHandle = (e) => {
    $("#newStudentNo").css("opacity", 0.7);
  };

  // CLICK AND ADD STUDENT
  const addStudent = (e, _id) => {
    const lessonID = $(e.currentTarget)
      .parent()
      .parent()
      .parent()
      .parent()
      .siblings(".lessonDiv")
      .attr("id");
    setSelectedLessonID(lessonID);
    const teacherID =
      state.title === "admin" ? searchParams.get("_id") : state.ID;
    setSelectedTeacherID(teacherID);
    let filtered = recommendStudents.filter((student) => student._id === _id);
    filtered[0].lessons = [
      ...filtered[0].lessons,
      {
        lessonID,
        grade: "",
        teacherID,
      },
    ];
    setFetchVars({
      url: `${state.url.students}/${_id}`,
      body: filtered[0],
      action: "patch",
    });
    dispatch({ type: "IS_FETCH", payload: !state.isFetch });
  };

  useEffect(() => {
    if ((selectedLessonID, selectedTeacherID)) {
      // GET STUDENTS
      setFetchVars({
        url: state.url.students,
        body: "",
        action: "get",
        searchParams: {
          lessonID: selectedLessonID,
          teacherID: selectedTeacherID,
        },
      });
    }
  }, [selectedLessonID, selectedTeacherID, state.isFetch]);

  useFetch(
    fetchVars.url,
    fetchVars.body,
    fetchVars.action,
    fetchVars.searchParams,
    state.isFetch
  );

  return (
    <article className="studentDiv" id="newStudentArticle">
      <div></div>
      <div className="studentNo" id="newStudentDiv">
        <input
          className="tdInput"
          id="newStudentNo"
          type="number"
          value={value}
          name="studentNo"
          onBlur={(e) => blurHandle(e)}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => keyDownHandle(e)}
        />
        <div id="recommendNo">
          {recommendStudents && recommendStudents.length < 3
            ? recommendStudents.map((student) => (
                <div
                  key={student._id}
                  id={student._id}
                  className="recommendNo"
                  onClick={(e) => addStudent(e, student._id)}
                >
                  {student.studentNo}
                </div>
              ))
            : iterateNums &&
              iterateNums.map((number) => (
                <div
                  key={recommendStudents[number]._id}
                  id={recommendStudents[number]._id}
                  className="recommendNo"
                  onClick={(e) => addStudent(e, recommendStudents[number]._id)}
                >
                  {recommendStudents[number].studentNo}
                </div>
              ))}
        </div>
      </div>
      <div className="studentName" id="studentName">
        ENTER A STUDENT NUMBER
      </div>
      <div className="studentGrade">
        <div className="gradeDiv"></div>
      </div>
    </article>
  );
};

export default NewStudent;
