import React, { useContext, useState, useEffect } from "react";

// COMPONENTS
import WrongPage from "../../../errors/WrongPage";
import { Context } from "../../../data/Context";
import Semester from "./Semester";
import StudentGrade from "./StudentGrade";
import NewLesson from "./NewLesson";

// NPMS
import $ from "jquery";
import { useSearchParams } from "react-router-dom";

// HOOKS
import useFetch from "../../../hooks/useFetch";
import useComponent from "../../../hooks/useComponent";
import useNavbar from "../../../hooks/useNavbar";

// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronDown);

const Teacher = () => {
  // STATE
  const { state, dispatch } = useContext(Context);
  // COMPONENT
  const component = useComponent();
  // SHOULD I FETCH?
  const [isFetch, setIsFetch] = useState(true);
  // LESSON ID
  const [lessonsID, setLessonsID] = useState("");
  // FETCH VARS
  const [fetchVars, setFetchVars] = useState({
    url: "",
    body: "",
    action: "",
    searchParams: "",
  });
  // SELECTED TEACHERID
  const [selectedTeacherID, setSelectedTeacherID] = useState("");

  // QUERY
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (component) {
      if (state.title === "admin") {
        setFetchVars({
          url: `${state.url.teachers}/${searchParams.get("_id")}`,
          body: "",
          action: "get",
        });
        setSelectedTeacherID(searchParams.get("_id"));
      }
      if (state.title === "teacher") {
        setFetchVars({
          url: `${state.url.teachers}/${state.ID}`,
          body: "",
          action: "get",
          searchParams,
        });
        setSelectedTeacherID(searchParams.get(state.ID));
      }
    }
    setIsFetch(true);
  }, [
    state.url,
    state.isFetch,
    component,
    state.ID,
    searchParams,
    state.title,
  ]);

  useEffect(() => {
    if (state.teachersData) {
      setFetchVars({
        url: state.url.branches,
        body: "",
        action: "get",
        searchParams: {
          branches: state.teachersData.branches,
        },
      });
    }
  }, [state.teachersData]);

  // DELETE LESSON
  const deleteHandle = (_id) => {
    const updatedTeacher = state.teachersData;
    const deleteLesson = updatedTeacher.branches.filter(
      (branch) => branch !== _id
    );
    updatedTeacher.branches = deleteLesson;
    setFetchVars({
      url: `${state.url.teachers}/${state.teachersData._id}`,
      body: updatedTeacher,
      action: "patch",
    });
    dispatch({ type: "IS_FETCH", payload: !state.isFetch });

    console.log(deleteLesson);
  };

  const clickHandle = (e) => {
    const lessonID = $(e.currentTarget).parent(".lessonDiv").attr("id");
    setLessonsID(lessonID);
    const query = $(e.currentTarget)
      .siblings(".lessonName")
      .html()
      .replace(/ /g, "_");
    // SET QUERY
    setSearchParams((searchParams) => {
      searchParams.set("lesson", query);
      return searchParams;
    });
    // GET STUDENTS
    setFetchVars({
      url: state.url.students + "/getByID",
      body: "",
      action: "get",
      searchParams: { lessonID, teacherID: selectedTeacherID },
    });
    $(".studentsDiv").css("display", "none");
    $(e.currentTarget).parent().siblings(".studentsDiv").css("display", "grid");
  };
  // SET SELECTED BUTTON COLOR
  useNavbar(component);
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
      <div
        id="lessonsSection"
        onClick={() => dispatch({ type: "IS_SEMESTER", payload: false })}
      >
        <article id="lessonContainer">
          {state.branchesData &&
            searchParams.get("semester") &&
            state.branchesData.map((branch) => {
              const { lesson, semester, _id } = branch;
              if (semester == searchParams.get("semester")) {
                return (
                  <article className="lessons" key={_id}>
                    <div className="lessonDiv" id={_id}>
                      <div
                        className="slideDown"
                        onMouseEnter={(e) =>
                          $(e.target).children().css("color", "white")
                        }
                        onMouseLeave={(e) =>
                          $(e.target).children().css("color", "black")
                        }
                        onClick={() => deleteHandle(_id)}
                      >
                        <FontAwesomeIcon
                          icon="fa-trash"
                          className="icon downIcon"
                        />
                      </div>
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
                    <StudentGrade props={lessonsID} />
                  </article>
                );
              }
            })}
        </article>
      </div>
    </>
  );
};

export default Teacher;
