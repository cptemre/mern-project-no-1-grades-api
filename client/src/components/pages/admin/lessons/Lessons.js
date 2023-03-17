import React, { useContext } from "react";

// COMPONENTS
import { Context } from "../../../../data/Context";
import Semester from "../../teacher/Semester";
import CreateLesson from "./CreateLesson";
import GetLessons from "./GetLessons";
import AddLesson from "./AddLesson";

// HOOKS
import useComponent from "../../../../hooks/useComponent";
import Teacher from "../../teacher/Teacher";

const Lessons = () => {
  // STATE
  const { state, dispatch } = useContext(Context);
  // COMPONENT
  const component = useComponent();
  return (
    <>
      <section
        id="teacherSection"
        onClick={() => dispatch({ type: "IS_NAVBAR", payload: false })}
      >
        <div
          className="lessonComponentsDiv"
          onClick={() => dispatch({ type: "IS_SEMESTER", payload: false })}
        >
          {component === "lessons" ? (
            <>
              <CreateLesson />
              <div className="allLessons">
                <GetLessons />
              </div>
            </>
          ) : (
            <>
              <AddLesson />
              <div className="allLessons">
                <Teacher />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Lessons;
