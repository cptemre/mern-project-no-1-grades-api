import React, { useState } from "react";

// NPMS
import $ from "jquery";

const NewStudent = () => {
  // VALUE
  const [value, setValue] = useState("");
  return (
    <article className="studentDiv">
      <div className="studentNo">
        <input
          className="tdInput"
          id="newStudentNo"
          type="number"
          value={value}
          name="lesson"
          onBlur={(e) => $("#newStudentNo").css("opacity", 0.7)}
          onChange={(e) => setValue(e.target.value)}
          //   onKeyDown={(e) => keyDownHandle(e)}
        />
      </div>
      <div className="studentName">ADD THE STUDENT NO</div>
      <div className="studentGrade">
        <div className="gradeDiv"></div>
      </div>
    </article>
  );
};

export default NewStudent;
