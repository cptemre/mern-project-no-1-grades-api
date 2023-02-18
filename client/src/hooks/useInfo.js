import { useEffect, useContext } from "react";
// COMPONENTS
import { Context } from "../components/Context";
// NPMS
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";

const useAuth = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([
    "refresh_token",
    "ID",
    "name",
    "surname",
    "email",
    "title",
    "isAuth",
  ]);
  const { decodedToken, isExpired, reEvaluateToken } = useJwt("");

  // SET JWT TO REFRESH TOKEN IF COOKIES CHANGE
  useEffect(() => {
    if (isExpired) {
      reEvaluateToken(cookies.refresh_token);
    }
  }, [cookies.refresh_token, isExpired]);

  // DECODE THE TOKEN AND SET USER INFO TO STATE
  useEffect(() => {
    if (decodedToken && !isExpired) {
      const { ID, name, surname, email, title } = decodedToken;
      setCookie("ID", ID);
      setCookie("name", name);
      setCookie("surname", surname);
      setCookie("email", email);
      setCookie("isAuth", true);
      if (email === "admin@ga.pl") {
        setCookie("title", "admin");
      } else {
        setCookie("ID", title);
      }
    } else {
      setCookie("isAuth", false);
    }
  }, [decodedToken]);
};

export default useAuth;
