import { useState, useEffect, useContext } from "react";
// COMPONENTS
import { Context } from "../components/Context";
// NPMS
import axios from "axios";
import { useCookies } from "react-cookie";
const usePost = async (url, body) => {
  // COOKIE
  const [cookies, setCookie] = useCookies(["refresh_token"]);
  // CONTEXT VALUES
  const { dispatch } = useContext(Context);
  // RETURN VARIABLES
  const [msg, setMsg] = useState("");
  const [jwt, setjwt] = useState("");
  useEffect(() => {
    post();
  }, [url, body]);

  // SET MSG TO STATE
  useEffect(() => {
    if (msg) {
      dispatch({ type: "MSG", payload: msg });
    }
  }, [msg]);
  // SET ACCESS TOKEN TO STATE
  useEffect(() => {
    if (jwt && jwt.access_token) {
      dispatch({ type: "ACCESS_TOKEN", payload: jwt.access_token });
    }
    if (jwt && jwt.refresh_token) {
      setCookie("refresh_token", jwt.refresh_token, { path: "/" });
    }
  }, [jwt]);
  // AXIOS POST FUNCTION TO CALL WHEN URL OR BODY CHANGE
  const post = async () => {
    try {
      const { data } = await axios.post(url, body);
      setMsg(data.msg);
      setjwt(data.jwt);
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };
};

export default usePost;
