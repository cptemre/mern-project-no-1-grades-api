import { useState, useEffect, useContext } from "react";
// COMPONENTS
import { Context } from "../components/Context";
// NPMS
import axios from "axios";
const usePost = async (url, body) => {
  // CONTEXT VALUES
  const { state, dispatch } = useContext(Context);
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
