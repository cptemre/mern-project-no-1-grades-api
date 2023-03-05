import React, { useEffect, useState, useContext } from "react";

// COMPONENTS
import { Context } from "../../../data/Context";

// NPMS
import $ from "jquery";

// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronDown);

const Semester = () => {
  // STATE
  const { state, dispatch } = useContext(Context);
  // SEMESTERS
  const [semesters, setSemesters] = useState([2, 3, 4, 5, 6, 7, 8]);

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
    let filtered = [...semesters, state.selectedSemester];
    filtered = filtered.filter((semester) => semester != value);
    setSemesters(filtered.sort());
    dispatch({ type: "SELECTED_SEMESTER", payload: value });
  };
  return (
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
          {state.selectedSemester && state.selectedSemester}
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
  );
};

export default Semester;
