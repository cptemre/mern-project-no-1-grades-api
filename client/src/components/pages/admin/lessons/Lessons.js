import React, { useContext } from "react";

// COMPONENTS
import { Context } from "../../../../data/Context";
import Semester from "../../teacher/Semester";
import CreateLesson from "./CreateLesson";
import GetLessons from "./GetLessons";

const Lessons = () => {
  // STATE
  const { state, dispatch } = useContext(Context);
  return (
    <>
      <section
        id="teacherSection"
        onClick={() => dispatch({ type: "IS_NAVBAR", payload: false })}
      >
        <Semester />
        <div
          className="lessonComponentsDiv"
          onClick={() => dispatch({ type: "IS_SEMESTER", payload: false })}
        >
          <CreateLesson />
          <div className="allLessons">
            <GetLessons />
          </div>
        </div>
      </section>
    </>
  );
};

export default Lessons;
