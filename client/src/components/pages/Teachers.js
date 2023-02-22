import React, { useEffect, useState, useContext } from "react";

// COMPONENTS
import { Context } from "../../components/Context";
// HOOKS
import usePost from "../../hooks/usePost";

// NPMS
import $ from "jquery";
import { useSearchParams } from "react-router-dom";

const Teachers = () => {
  // STATE
  const { state } = useContext(Context);

  // TABLE HEADERS FOR TH
  const headers = {
    new: "NEW",
    name: "NAME",
    surname: "SURNAME",
    email: "EMAIL",
    password: "PASSWORD",
    date: "DATE",
    delete: "",
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

  useEffect(() => {
    setFetchVars({
      url: state.url.teachers,
      body: "",
      action: "get",
      searchParams,
    });
  }, [state.url]);

  // INPUT VALUE CHANGE
  const changeHandle = (e) => {
    setValue(e.target.value);
  };

  // GET NEW DATA ON MSG CHANGE
  useEffect(() => {
    if (state.msg === "UPDATED" || "CREATED" || "DELETED") {
      setFetchVars({
        url: state.url.teachers,
        body: "",
        action: "get",
        searchParams,
      });
    }
  }, [state.msg, state.url]);

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
      url: `${state.url.teachers}/${_id}`,
      body: { [name]: value },
      action: "patch",
      searchParams,
    });
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
    setNewTd(false);
  };
  //#endregion ADD NEW PERSON

  //#region DELETE PERSON

  const deleteHandle = (e) => {
    const target = e.target;
    const _id = $(target).parent().attr("id");
    setFetchVars({
      url: `${state.url.teachers}/${_id}`,
      body: "",
      action: "delete",
      searchParams,
    });
  };

  //#endregion DELETE PERSON

  const sortHeader = (e) => {
    const sortValue = e.target.innerHTML.toLowerCase();
    setSearchParams((searchParams) => {
      searchParams.set("sortValue", sortValue);
      return searchParams;
    });
  };

  // AXIOS CALL
  usePost(
    fetchVars.url,
    fetchVars.body,
    fetchVars.action,
    fetchVars.searchParams
  );

  console.log(searchParams.get("sortValue"));
  return (
    <section id="table">
      <div id="searchDiv">
        <div id="searchOptions"></div>
        <div id="search">
          <input type="text" id="searchInput" />
          <div id="searchType">NAME</div>
        </div>
      </div>
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
              const { _id, name, surname, email, branches, createdAt } = result;
              return (
                <tr className="row" key={_id} id={_id}>
                  <td className="new"></td>
                  <td className="name">
                    <div className="nameDiv" onClick={(e) => clickHandle(e)}>
                      {name}
                    </div>
                    <input
                      className="tdInput"
                      type="text"
                      value={value}
                      name="name"
                      onBlur={(e) => blurHandle(e)}
                      onChange={(e) => changeHandle(e)}
                    />
                  </td>
                  <td className="surname">
                    <div className="nameDiv" onClick={(e) => clickHandle(e)}>
                      {surname}
                    </div>
                    <input
                      className="tdInput"
                      type="text"
                      value={value}
                      name="surname"
                      onBlur={(e) => blurHandle(e)}
                      onChange={(e) => changeHandle(e)}
                    />
                  </td>

                  <td className="email">
                    <div className="nameDiv" onClick={(e) => clickHandle(e)}>
                      {email}
                    </div>
                    <input
                      className="tdInput"
                      type="email"
                      value={value}
                      name="email"
                      onBlur={(e) => blurHandle(e)}
                      onChange={(e) => changeHandle(e)}
                    />
                  </td>
                  <td className="password">
                    <div className="nameDiv" onClick={(e) => clickHandle(e)}>
                      ****
                    </div>
                    <input
                      className="tdInput"
                      type="password"
                      value={value}
                      name="password"
                      onBlur={(e) => blurHandle(e)}
                      onChange={(e) => changeHandle(e)}
                    />
                  </td>
                  <td className="date">
                    <div className="nameDiv" onClick={(e) => clickHandle(e)}>
                      01.01.2023
                    </div>
                  </td>
                  <td className="delete" onClick={(e) => deleteHandle(e)}>
                    &#x2716;
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default Teachers;
