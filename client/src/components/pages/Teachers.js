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
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");

  // INPUT VALUE
  const [value, setValue] = useState("");

  useEffect(() => {
    setUrl("/api/v1/teachers");
  }, []);

  const blurHandle = (e) => {
    const target = e.target;
    const value = e.target.value;
    const name = e.target.name;
    setBody({ name: value });
    $(target).siblings("div").css("display", "grid");
    $(target).css("display", "none");
    setValue("");
  };

  const changeHandle = (e) => {
    setValue((old) => old + e.target.value);
  };

  const clickHandle = (e) => {
    const target = e.target;
    const html = $(target).html();
    $(target).siblings("input").css("display", "initial").focus();
    $(target).css("display", "none");
    setValue(html)
  };

  usePost(url, body, "get");

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
            <th>NEW</th>
            <th>NAME</th>
            <th>SURNAME</th>
            <th>EMAIL</th>
            <th>PASSWORD</th>
            <th>DATE</th>
            <th>DELETE</th>
          </tr>
          {state.data &&
            state.data.map((result) => {
              const { _id, name, surname, email, createdAt } = result;
              console.log(result);
              return (
                <tr className="row" key={_id}>
                  <td className="new">&#x2716;</td>
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
                      ***********
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
