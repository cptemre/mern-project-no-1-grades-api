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
  // USESEARCHPARAMS
  const [searchParams, setSearchParams] = useSearchParams();
  // FETCH PART
  const [url, setUrl] = useState("/api/v1/teachers");
  const [body, setBody] = useState("");
  const [action, setAction] = useState("get");
  // INPUT VALUE
  const [value, setValue] = useState("");

  // NEW TD
  const [newTd, setNewTd] = useState(false);

  // INPUT VALUE CHANGE
  const changeHandle = (e) => {
    setValue(e.target.value);
  };

  // GET NEW DATA ON MSG CHANGE
  useEffect(() => {
    if (state.msg === "UPDATED" || "CREATED" || "DELETED") {
      setAction("get");
      setUrl("/api/v1/teachers");
      setBody("");
    }
  }, [state.msg, url]);

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
    setBody({ [name]: value });
    setAction("patch");
    setUrl(`/api/v1/teachers/${_id}`);
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
    setUrl("/api/v1/user/sign_in");
    setBody({ name, surname });
    setAction("post");
    setNewTd(false);
  };
  //#endregion ADD NEW PERSON

  //#region DELETE PERSON

  const deleteHandle = (e) => {
    const target = e.target;
    const _id = $(target).parent().attr("id");
    setBody("");
    setAction("delete");
    setUrl(`/api/v1/teachers/${_id}`);
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
  usePost(url, body, action, searchParams);

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
            <th className="new" onClick={() => newRow()}>
              &#x2295;
            </th>
            <th className="name" onClick={(e) => sortHeader(e)}>
              NAME
            </th>
            <th className="surname" onClick={(e) => sortHeader(e)}>
              SURNAME
            </th>
            <th className="email">EMAIL</th>
            <th className="password">PASSWORD</th>
            <th className="date">DATE</th>
            <th className="delete"></th>
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
