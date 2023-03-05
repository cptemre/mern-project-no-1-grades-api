import React, { useState, useEffect, useContext } from "react";

// COMPONENTS
import { Context } from "../../../data/Context";

// NPMS
import $ from "jquery";

// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronDown, faCirclePlus);

const NewLesson = () => {
  // STATE
  const { state } = useContext(Context);

  // NEW LESSON
  const [isNewLesson, setIsNewLesson] = useState(false);

  const clickHandle = (e) => {
    setIsNewLesson(!isNewLesson);
  };

  return (
    <article className="lessons" id="newLesson">
      <div className="lessonDiv" id="newLessonAdd">
        {!isNewLesson ? (
          <>
            <div></div>
            <div
              id="newLessonIconDiv"
              onMouseEnter={(e) => $(e.target).children().css("color", "white")}
              onMouseLeave={(e) => $(e.target).children().css("color", "black")}
              onClick={(e) => clickHandle(e)}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-circle-plus"
                className="icon newLessonIcon"
              />
            </div>
          </>
        ) : (
          <>
            <div className="lessonName">lesson</div>
            <div
              className="slideDown"
              onMouseEnter={(e) => $(e.target).children().css("color", "white")}
              onMouseLeave={(e) => $(e.target).children().css("color", "black")}
              onClick={(e) => clickHandle(e)}
            >
              <FontAwesomeIcon
                icon="fa-chevron-down"
                className="icon downIcon"
              />
            </div>
          </>
        )}
      </div>
    </article>
  );
};

export default NewLesson;
