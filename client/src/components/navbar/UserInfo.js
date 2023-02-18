import React, { useContext } from "react";
// COMPONENTS
import { Context } from "../Context";
// NPMS
import { useCookies } from "react-cookie";

const UserInfo = () => {
  const [cookies, setCookie] = useCookies([
    "refresh_token",
    "ID",
    "name",
    "surname",
    "email",
    "title",
    "isAuth",
  ]);
  return (
    <section id="userInfo">
      <article id="userName">
        {cookies.name} {cookies.surname}
      </article>
      <article id="userTitle">{cookies.title}</article>
      <article id="userEmail">{cookies.email}</article>
    </section>
  );
};

export default UserInfo;
