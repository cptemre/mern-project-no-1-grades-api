import React, { useContext, useState, useEffect } from "react";

// COMPONENTS
import WrongPage from "../../errors/WrongPage";
import NoData from "../../errors/NoData";
import Loading from "../loading/Loading";
import { Context } from "../../data/Context";

// NPMS
import $ from "jquery";

// HOOKS
import useFetch from "../../hooks/useFetch";
import useLoad from "../../hooks/useLoad";
import useComponent from "../../hooks/useComponent";
import useNavbar from "../../hooks/useNavbar";

// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronDown);

const Teacher = () => {
  // STATE
  const { state, dispatch } = useContext(Context);
  console.log(state.data);
  // IS LOAD
  const isLoad = useLoad();
  // COMPONENT
  const component = useComponent();
  // SHOULD I FETCH?
  const [isFetch, setIsFetch] = useState(true);
  // FETCH VARS
  const [fetchVars, setFetchVars] = useState({
    url: "",
    body: "",
    action: "",
    searchParams: "",
  });
  useEffect(() => {
    if (component) {
      setFetchVars({
        url: `${state.url.teachers}/${state.ID}`,
        body: "",
        action: "get",
        searchParams: "",
      });
    }
  }, [state.url, isFetch, component, state.ID]);
  console.log(state.teacherData);
  // SET SELECTED BUTTON COLOR
  useNavbar(component, isLoad);

  // TODO - ADD FUNCTION ON COMPONENT CLICK HIDE NAVBAR FROM STATE ISNAVBAR
  // TODO - ADD LOADING FUNCTION
  // AXIOS CALL
  useFetch(
    fetchVars.url,
    fetchVars.body,
    fetchVars.action,
    fetchVars.searchParams,
    isFetch
  );
  return (
    <>
      {component !== "lessons" && component !== "account" ? (
        <WrongPage />
      ) : !state.teacherData && !isLoad ? (
        <Loading />
      ) : !state.teacherData ? (
        <NoData />
      ) : (
        <section
          id="lessonsSection"
          onClick={() => dispatch({ type: "IS_NAVBAR", payload: false })}
        >
          <article id="lessonContainer">
            {state.teacherData.branches ? (
              state.teacherData.branches.map((branch) => (
                <article className="lessons" key={branch}>
                  <div className="lessonName">{branch}</div>
                  <div
                    className="slideDown"
                    onMouseEnter={(e) =>
                      $(e.target).children().css("color", "white")
                    }
                    onMouseLeave={(e) =>
                      $(e.target).children().css("color", "black")
                    }
                  >
                    <FontAwesomeIcon
                      icon="fa-chevron-down"
                      className="icon downIcon"
                    />
                  </div>
                </article>
              ))
            ) : (
              <div>CONTACT WITH ADMIN TO ADD LESSONS</div>
            )}
          </article>
        </section>
      )}
    </>
  );
};

export default Teacher;
