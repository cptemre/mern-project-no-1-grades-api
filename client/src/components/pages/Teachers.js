import React, { useEffect, useState, useContext } from "react";

// COMPONENTS
import { Context } from "../../components/Context";
// HOOKS
import usePost from "../../hooks/usePost";

// NPMS
import $ from "jquery";

const Teachers = () => {
  const { state } = useContext(Context);

  // FETCH PART
  const [url, setUrl] = useState("/api/v1/teachers");
  const [body, setBody] = useState("");
  const [action, setAction] = useState("get");
  // INPUT VALUE
  const [value, setValue] = useState("");

  // NEW TD
  const [newTd, setNewTd] = useState(false)

  // INPUT VALUE CHANGE
  const changeHandle = (e) => {
    setValue(e.target.value);
  };
  // CHANGE INPUT TO DIV  I
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

    // LOCAL DATA CHANGE
    state.data.map((person) => {
      if (person._id === _id) {
        person[name] = value;
      }
    });
  };
  // CHANGE DIV TO INPUT
  const clickHandle = (e) => {
    const target = e.target;
    const className = $(target).parent().attr("class");
    const html = $(target).html();
    $(target).siblings("input").css("display", "initial").focus();
    $(target).css("display", "none");
    if (className !== "password") {
      setValue(html);
    }
  };

  const newRow = () => {
    setNewTd(true)
  }

  usePost(url, body, action);

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
            <th className="name">NAME</th>
            <th className="surname">SURNAME</th>
            <th className="email">EMAIL</th>
            <th className="password">PASSWORD</th>
            <th className="date">DATE</th>
            <th className="delete"></th>
          </tr>
          {newTd && (
            <tr className="row">
              <td className="new">&#x2713;</td>
              <td className="name">
                <input
                  className="tdInput newInput"
                  type="text"
                  value={value}
                  name="name"
                  onChange={(e) => changeHandle(e)}
                />
              </td>
              <td className="surname">
                <input
                  className="tdInput newInput"
                  type="text"
                  value={value}
                  name="surname"
                  onChange={(e) => changeHandle(e)}
                />
              </td>
              <td className="email">
                <input
                  className="tdInput newInput"
                  type="email"
                  value={value}
                  name="email"
                  onChange={(e) => changeHandle(e)}
                />
              </td>
              <td className="password">
                <input
                  className="tdInput newInput"
                  type="password"
                  value={value}
                  name="password"
                  onChange={(e) => changeHandle(e)}
                />
              </td>
              <td className="date"></td>
              <td className="delete" onClick={() => setNewTd(false)}>
                &#x2716;
              </td>
            </tr>
          )}
          {state.data &&
            state.data.map((result) => {
              const { _id, name, surname, email, createdAt } = result;
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
                  <td className="delete">&#x2716;</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default Teachers;
