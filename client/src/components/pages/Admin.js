import React, { useEffect, useState, useContext } from "react";

// COMPONENTS
import { Context } from "../../data/Context";
import Loading from "../loading/Loading";
import Search from "../search/Search";

// ERROR
import NoData from "../../errors/NoData";
// HOOKS
import usePost from "../../hooks/useFetch";

// NPMS
import $ from "jquery";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import WrongPage from "../../errors/WrongPage";

const Teachers = () => {
  // STATE
  const { state } = useContext(Context);
  // PARAMS
  const { component } = useParams();
  // LOCATION
  const navigate = useNavigate();
  // SHOULD I LOAD?
  const [isLoad, setIsLoad] = useState(false);
  // SHOULD I FETCH?
  const [isFetch, setIsFetch] = useState(true);
  const [componentURL, setComponentURL] = useState("");
  // TABLE HEADERS FOR TH
  const headers = {
    new: "NEW",
    name: "NAME",
    surname: "SURNAME",
    email: "EMAIL",
    password: "PASSWORD",
    date: "DATE",
    delete: "DELETE",
  };

  // USESEARCHPARAMS
  const [searchParams, setSearchParams] = useSearchParams();
  // FETCH VARIABLES
  const [fetchVars, setFetchVars] = useState({
    url: "",
    body: "",
    action: "",
    searchParams,
  });
  // INPUT VALUE
  const [value, setValue] = useState("");

  // NEW TD
  const [newTd, setNewTd] = useState(false);

  // IF SUB LINK NOT DECIDED THEN AUTO START FOR ADMIN IS FROM TEACHERS
  useEffect(() => {
    if (!component) {
      navigate("/teachers");
    }
    setComponentURL(component);
  }, [component]);

  // UNTIL STATE OR ISLOAD GETS READ SHOW LOADING SCREEN THEN SHOW PAGE OR LOGIN DEPENDS ON AUTHORIZATION
  useEffect(() => {
    if (!isLoad) {
      load();
    }
  }, [isLoad]);
  const load = () => {
    setTimeout(() => {
      setIsLoad(true);
    }, 1000);
  };

  // SET SELECTED BUTTON COLOR
  useEffect(() => {
    if ((state.title, component, isLoad)) {
      $(".option").css("background-color", "white");
      $(`#${component}Option`).css("background-color", "red");
    }
  }, [state.title, component, isLoad]);

  useEffect(() => {
    if (componentURL) {
      setFetchVars({
        url: state.url[componentURL],
        body: "",
        action: "get",
        searchParams,
      });
      setIsLoad(false);
    }
  }, [state.url, isFetch, searchParams, componentURL]);

  // INPUT VALUE CHANGE
  const changeHandle = (e) => {
    setValue(e.target.value);
  };

  //#region UPDATE

  // CHANGE DIV TO INPUT
  const clickHandle = (e) => {
    const target = e.target;
    const className = $(target).parent().attr("class");
    const html = $(target).html();
    $(target).siblings("input").css("display", "initial").focus();
    $(target).css("display", "none");
    if ($(target).html() === "----") {
      setValue("");
    } else {
      if (className !== "password") {
        setValue(html);
      }
    }
  };

  // CHANGE INPUT TO DIV
  const blurHandle = (e) => {
    const target = e.target;
    const value = e.target.value;
    const name = e.target.name;
    const _id = $(target).parent().parent().attr("id");
    setFetchVars({
      url: `${state.url[componentURL]}/${_id}`,
      body: { [name]: value },
      action: "patch",
      searchParams,
    });
    setIsFetch(!isFetch);

    $(target).siblings("div").css("display", "grid");
    $(target).css("display", "none");
    setValue("");
  };

  //#endregion UPDATE

  //#region ADD NEW PERSON

  // ADD NEW ROW TO TABLE
  const newRow = () => {
    setNewTd(true);
  };
  // INPUT FOCUS OUT FUNCTION
  const newBlurHandle = (e) => {
    const target = e.target;
    $(target).siblings("div").css("display", "grid");
    $(target).siblings("div").html(target.value);
    $(target).css("display", "none");
  };
  // ADD NEW PERSON BUTTON FUNCTION
  const newPerson = (e) => {
    const target = e.target;
    const name = $(target).siblings(".name").children("div").html();
    const surname = $(target).siblings(".surname").children("div").html();
    setFetchVars({
      url: state.url.user.sign_in,
      body: { name, surname },
      action: "post",
      searchParams,
    });
    setIsFetch(!isFetch);
    setNewTd(false);
  };
  //#endregion ADD NEW PERSON

  //#region DELETE PERSON

  const deleteHandle = (e) => {
    const target = e.target;
    const _id = $(target).parent().attr("id");
    setFetchVars({
      url: `${state.url[componentURL]}/${_id}`,
      body: "",
      action: "delete",
      searchParams,
    });
    setIsFetch(!isFetch);
  };

  //#endregion DELETE PERSON

  const sortHeader = (e) => {
    const sortValue = e.target.innerHTML.toLowerCase();
    // SET QUERY TO BE ABLE TO SORT FROM SERVER SIDE
    let sortNumber = -1;
    if (
      !searchParams.get("sortValue") ||
      searchParams.get("sortValue").endsWith(-1)
    )
      sortNumber = 1;
    setSearchParams((searchParams) => {
      searchParams.set("sortValue", `${sortValue}_${sortNumber}`);
      return searchParams;
    });
    setIsFetch(!isFetch);
  };

  // AXIOS CALL
  usePost(
    fetchVars.url,
    fetchVars.body,
    fetchVars.action,
    fetchVars.searchParams,
    isFetch
  );
  return (
    <>
      {component !== "teachers" && component !== "students" ? (
        <WrongPage />
      ) : !state.data && !isLoad ? (
        <Loading />
      ) : !state.data ? (
        <NoData />
      ) : (
        <section id="table">
          <Search />
          <table>
            <tbody>
              <tr>
                {headers &&
                  Object.keys(headers).map((key) => {
                    if (key === "new") {
                      return (
                        <th key={key} className={key} onClick={() => newRow()}>
                          {headers[key]}
                        </th>
                      );
                    } else if (key === "delete") {
                      return (
                        <th key={key} className={key}>
                          {headers[key]}
                        </th>
                      );
                    } else {
                      return (
                        <th
                          key={key}
                          className={key}
                          onClick={(e) => sortHeader(e)}
                        >
                          {headers[key]}
                        </th>
                      );
                    }
                  })}
              </tr>
              {newTd && (
                <tr className="row newRow">
                  <td className="new" onClick={(e) => newPerson(e)}>
                    &#x2713;
                  </td>
                  <td className="name">
                    <div className="nameDiv" onClick={(e) => clickHandle(e)}>
                      ----
                    </div>
                    <input
                      className="tdInput"
                      type="text"
                      value={value}
                      name="name"
                      onChange={(e) => changeHandle(e)}
                      onBlur={(e) => newBlurHandle(e)}
                    />
                  </td>
                  <td className="surname">
                    <div className="nameDiv" onClick={(e) => clickHandle(e)}>
                      ----
                    </div>
                    <input
                      className="tdInput"
                      type="text"
                      value={value}
                      name="surname"
                      onChange={(e) => changeHandle(e)}
                      onBlur={(e) => newBlurHandle(e)}
                    />
                  </td>
                  <td className="email"></td>
                  <td className="password"></td>
                  <td className="date"></td>
                  <td className="delete" onClick={() => setNewTd(false)}>
                    &#x2716;
                  </td>
                </tr>
              )}
              {state.data &&
                state.data.map((result) => {
                  const { _id, name, surname, email, branches, createdAt } =
                    result;
                  const date = new Date(createdAt);
                  const dateM = date.getMonth() + 1;
                  const dateVal =
                    date.getDate() + "-" + dateM + "-" + date.getFullYear();
                  return (
                    <tr className="row" key={_id} id={_id}>
                      {Object.keys(headers).map((key, i) => {
                        if (key === "new") {
                          return <td key={_id + key} className={key}></td>;
                        } else if (key === "delete") {
                          return (
                            <td
                              key={_id + key}
                              className="delete"
                              onClick={(e) => deleteHandle(e)}
                            >
                              &#x2716;
                            </td>
                          );
                        } else {
                          return (
                            <td key={_id + key} className={key}>
                              <div
                                className={key + "Div"}
                                onClick={(e) => clickHandle(e)}
                              >
                                {key === "password"
                                  ? "----"
                                  : key === "date"
                                  ? dateVal
                                  : result[key]}
                              </div>
                              <input
                                className="tdInput"
                                type="text"
                                value={value}
                                name={key === "date" ? "createdAt" : key}
                                onBlur={(e) => blurHandle(e)}
                                onChange={(e) => changeHandle(e)}
                              />
                            </td>
                          );
                        }
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
};

export default Teachers;
