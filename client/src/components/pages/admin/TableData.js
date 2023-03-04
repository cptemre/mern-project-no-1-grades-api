import React, { useEffect, useState, useContext } from "react";

// COMPONENTS
import { Context } from "../../../data/Context";
import Loading from "../../loading/Loading";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";

// HOOKS
import useFetch from "../../../hooks/useFetch";
import useComponent from "../../../hooks/useComponent";
import useNavbar from "../../../hooks/useNavbar";

// NPMS
import $ from "jquery";
import { useSearchParams } from "react-router-dom";

// ERRORS
import NoData from "../../../errors/NoData";
import WrongPage from "../../../errors/WrongPage";

const TableData = () => {
  // STATE
  const { state, dispatch } = useContext(Context);

  // IF SUB LINK NOT DECIDED THEN AUTO START FOR ADMIN IS FROM TEACHERS
  const component = useComponent();
  // SHOULD I FETCH?
  const [isFetch, setIsFetch] = useState(true);

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

  // SET SELECTED BUTTON COLOR
  useNavbar(component);

  useEffect(() => {
    if (component) {
      setFetchVars({
        url: state.url[component],
        body: "",
        action: "get",
        searchParams,
      });
    }
  }, [state.url, isFetch, searchParams, component]);

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
      url: `${state.url[component]}/${_id}`,
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
      url: `${state.url[component]}/${_id}`,
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
  useFetch(
    fetchVars.url,
    fetchVars.body,
    fetchVars.action,
    fetchVars.searchParams,
    isFetch
  );
  console.log(state.data.length);
  return state.isLoading ? (
    <Loading />
  ) : !state.isLoading && !state.data.length ? (
    <NoData />
  ) : (
    <table>
      <tbody>
        <tr>
          {headers &&
            Object.keys(headers).map((key) => {
              if (key === "new") {
                return (
                  <th
                    key={key}
                    className={key}
                    id="newBtn"
                    onClick={() => newRow()}
                  >
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
                  <th key={key} className={key} onClick={(e) => sortHeader(e)}>
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
                onChange={(e) => setValue(e.target.value)}
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
                onChange={(e) => setValue(e.target.value)}
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
            const { _id, createdAt } = result;
            const date = new Date(createdAt);
            const dateM = date.getMonth() + 1;
            const dateVal =
              date.getDate() + "-" + dateM + "-" + date.getFullYear();
            return (
              <tr className="row" key={_id} id={_id}>
                {Object.keys(headers).map((key, i) => {
                  if (key === "new") {
                    return (
                      <td key={_id + key} className={key}>
                        <div className="newDiv">&#8862;</div>
                      </td>
                    );
                  } else if (key === "delete") {
                    return (
                      <td
                        key={_id + key}
                        className="delete"
                        onClick={(e) => deleteHandle(e)}
                      >
                        <div className="deleteDiv">&#x2716;</div>
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
                          onChange={(e) => setValue(e.target.value)}
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
  );
};

export default TableData;
