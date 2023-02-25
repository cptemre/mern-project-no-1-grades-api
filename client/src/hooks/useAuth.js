import { useEffect, useContext } from "react";
// COMPONENTS
import { Context } from "../data/Context";
// NPMS
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";

const useAuth = () => {
  const { dispatch } = useContext(Context);
  const [cookies, setCookie] = useCookies([
    "refresh_token",
    "isAuth",
  ]);
  const { decodedToken, isExpired, reEvaluateToken } = useJwt(
    cookies.refresh_token || ""
  );

  // SET JWT TO REFRESH TOKEN IF COOKIES CHANGE
  useEffect(() => {
    reEvaluateToken(cookies.refresh_token);
  }, [cookies.refresh_token]);

  // DECODE THE TOKEN AND SET USER INFO TO STATE
  useEffect(() => {
    if (decodedToken && !isExpired) {
      const { ID, name, surname, email, title } = decodedToken;

      dispatch({ type: "ID", payload: ID });
      dispatch({ type: "NAME", payload: name });
      dispatch({ type: "SURNAME", payload: surname });
      dispatch({ type: "EMAIL", payload: email });
      setCookie("isAuth", true);
      if (email === "admin@ga.pl") {
        dispatch({ type: "TITLE", payload: "admin" });
      } else {
        dispatch({ type: "TITLE", payload: title });
      }
    } else {
      setCookie("isAuth", false);
    }
  }, [decodedToken, cookies.refresh_token, isExpired]);
};

export default useAuth;
