import React, { useEffect, useState, useContext } from "react";

// COMPONENTS
import { Context } from "../../../data/Context";

// HOOKS
import useComponent from "../../../hooks/useComponent";

// NPMS
import $ from "jquery";
import { useSearchParams } from "react-router-dom";

// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronDown);

const Semester = () => {
  // STATE
  const { state, dispatch } = useContext(Context);
  // COMPONENT
  const component = useComponent();
  // SEMESTERS
  const [semesters, setSemesters] = useState([2, 3, 4, 5, 6, 7, 8]);
  // QUERY
  const [searchParams, setSearchParams] = useSearchParams();

  // SET TO 1 IF NOT DECIDED
  useEffect(() => {
    console.log(searchParams.get("semester"));
    if (searchParams.get("semester") === null) {
      setSearchParams((searchParams) => {
        searchParams.set("semester", 1);
        return searchParams;
      });
    }
  }, []);

  // SEMESTER FUNCTIONS
  const semesterEnter = (e) => {
    const id = e.target.id;
    if (id === "semester") {
      $(e.currentTarget).css({
        backgroundColor: "var(--optionBg)",
        borderColor: "var(--inputBorder)",
        color: "black",
      });
      $("#semesterIcon").css("color", "black");
    } else {
      $(e.currentTarget).css({
        backgroundColor: "var(--inputBorder)",
        borderColor: "var(--optionBg)",
        color: "white",
      });
    }
  };
  const semesterLeave = (e) => {
    const id = e.target.id;
    if (id === "semester") {
      $(e.currentTarget).css({
        backgroundColor: "var(--inputBorder)",
        borderColor: "var(--optionBg)",
        color: "white",
      });
      $("#semesterIcon").css("color", "white");
    } else {
      $(e.currentTarget).css({
        backgroundColor: "var(--optionBg)",
        borderColor: "var(--inputBorder)",
        color: "black",
      });
    }
  };

  // SHOW AND HIDE SEMESTER OPTIONS
  useEffect(() => {
    if (state.isSemester) {
      $("#hiddenSemesters").css("display", "grid");
    } else {
      $("#hiddenSemesters").css("display", "none");
    }
  }, [state.isSemester]);

  // CHANGE SEMESTER
  const hiddenHandle = (e) => {
    $(".studentsDiv").css("display", "none");
    const value = $(e.currentTarget).children(".semesterNumber").html();
    let filtered = [...semesters, searchParams.get("semester")];

    setSearchParams((searchParams) => {
      searchParams.set("semester", value);
      return searchParams;
    });
    filtered = filtered.filter((semester) => semester != value);
    setSemesters(filtered.sort());
    dispatch({ type: "SELECTED_SEMESTER", payload: value });
  };
  const clickHandle = () => {
    dispatch({ type: "IS_SEMESTER", payload: false });
    dispatch({ type: "IS_NAVBAR", payload: false });
  };
  return (
    <div className="semesterContainer">
      <div className="semesterInfoDiv" onClick={() => clickHandle()}>
        {state.title === "admin" && component === "teacher"
          ? state.teachersData.name
          : component === "student"
          ? state.studentsData.name
          : ""}
      </div>
      <div id="semesterDiv">
        <div
          id="semester"
          onMouseEnter={(e) => semesterEnter(e)}
          onMouseLeave={(e) => semesterLeave(e)}
          onClick={() =>
            dispatch({ type: "IS_SEMESTER", payload: !state.isSemester })
          }
        >
          <span className="semesterSpan">SEMESTER</span>
          <span className="semesterNumber" id="selectedSemester">
            {searchParams && searchParams.get("semester")}
          </span>
          <FontAwesomeIcon
            icon="fa-chevron-down"
            id="semesterIcon"
            className="icon downIcon"
          />
        </div>
        <div id="hiddenSemesters">
          {semesters.map((semester) => (
            <div
              className="hiddenSemesters"
              key={`semester${semester}`}
              onMouseEnter={(e) => semesterEnter(e)}
              onMouseLeave={(e) => semesterLeave(e)}
              onClick={(e) => hiddenHandle(e)}
            >
              <span className="semesterSpan">SEMESTER</span>
              <span className="semesterNumber">{semester}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Semester;
