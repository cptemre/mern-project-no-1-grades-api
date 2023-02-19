import React, { useEffect, useState, useContext } from "react";

// COMPONENTS
import { Context } from "../../components/Context";
// HOOKS
import usePost from "../../hooks/usePost";

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
    const value = e.target.value;
    const name = e.target.name;
    setBody({ name: value });
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
            <th></th>
            <th>NAME</th>
            <th>SURNAME</th>
            <th>EMAIL</th>
            <th>PASSWORD</th>
            <th>DATE</th>
            <th></th>
          </tr>
          {state.data &&
            state.data.map((result) => {
              const { _id, name, surname, email, createdAt } = result;
              console.log(result);

              return (
                <tr className="row" key={result._id}>
                  <td className="new">&#x2716;</td>
                  <td className="name">
                    <input
                      className="tdInput"
                      type="text"
                      value={result.name}
                      name="name"
                      onBlur={(e) => blurHandle(e)}
                    />
                  </td>
                  <td className="surname">
                    <input
                      className="tdInput"
                      type="text"
                      value={result.surname}
                      name="surname"
                      onBlur={(e) => blurHandle(e)}
                    />
                  </td>
                  <td className="email">
                    <input
                      className="tdInput"
                      type="email"
                      value={result.email}
                      name="email"
                      onBlur={(e) => blurHandle(e)}
                    />
                  </td>
                  <td className="date">
                    <input className="tdInput" type="password" value="*****" />
                  </td>
                  <td className="date">
                    <input
                      className="tdInput"
                      type="text"
                      value={result.createdAt}
                    />
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
