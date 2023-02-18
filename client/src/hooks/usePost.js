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
  const { state, dispatch } = useContext(Context);
  // RETURN VARIABLES
  const [msg, setMsg] = useState("");
  const [jwt, setjwt] = useState("");
  useEffect(() => {
    if (url) {
      post();
    }
  }, [url, body, cookies.refresh_token, state.access_token]);

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
  console.log(state.access_token);
  // AXIOS POST FUNCTION TO CALL WHEN URL OR BODY CHANGE
  const post = async () => {
    try {
      const { data } = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${state.access_token} ${cookies.refresh_token}`,
        },
      });
      setMsg(data.msg);
      setjwt(data.jwt);
      console.log(state.access_token + "Refresh " + cookies.refresh_token);
      dispatch({ type: "ISAUTH", payload: true });
    } catch (error) {
      setMsg(error.response.data.msg);
      dispatch({ type: "ISAUTH", payload: false });
    }
  };
};

export default usePost;
