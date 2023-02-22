import { useState, useEffect, useContext } from "react";
// COMPONENTS
import { Context } from "../components/Context";
// NPMS
import axios from "axios";
import { useCookies } from "react-cookie";
const usePost = async (url, body='', action, params='') => {
  // COOKIE
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);
  // CONTEXT VALUES
  const { state, dispatch } = useContext(Context);
  // RETURN VARIABLES
  const [msg, setMsg] = useState("");
  const [jwt, setjwt] = useState("");
  useEffect(() => {
    console.log(url, 'body:' + body, 'action:'+action);
    if (url) {
      if (action === "post") {
        post();
      }
      if (action === "get") {
        get();
      }
      if (action === "patch") {
        patch();
      }
      if (action === "delete") {
        deleteF();
      }
    }
  }, [url, body, cookies.refresh_token, cookies.access_token, action]);

  // SET MSG TO STATE
  useEffect(() => {
    if (msg) {
      dispatch({ type: "MSG", payload: msg });
    }
  }, [msg]);
  // SET ACCESS TOKEN TO STATE
  useEffect(() => {
    if (jwt && jwt.access_token) {
      setCookie("access_token", jwt.access_token, { path: "/" });
    }
    if (jwt && jwt.refresh_token) {
      setCookie("refresh_token", jwt.refresh_token, { path: "/" });
    }
  }, [jwt]);

  // AXIOS POST FUNCTION TO CALL WHEN URL OR BODY CHANGE
  const get = async () => {
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.access_token} ${cookies.refresh_token}`,
        },
        params
      });
      setMsg(data.msg);
      setjwt(data.jwt);
      dispatch({ type: "ISAUTH", payload: true });
      dispatch({ type: "DATA", payload: data });
    } catch (error) {
      setMsg(error.response.data.msg);
      dispatch({ type: "ISAUTH", payload: false });
    }
  };

  // AXIOS POST FUNCTION TO CALL WHEN URL OR BODY CHANGE
  const post = async () => {
    try {
      const { data } = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${cookies.access_token} ${cookies.refresh_token}`,
        },
      });
      setMsg(data.msg);
      setjwt(data.jwt);
      dispatch({ type: "ISAUTH", payload: true });
    } catch (error) {
      console.log(error.response.data.msg);
      setMsg(error.response.data.msg);
      dispatch({ type: "ISAUTH", payload: false });
    }
  };

  // AXIOS PATCH FUNCTION TO CALL WHEN URL OR BODY CHANGE
  const patch = async () => {
    try {
      const { data } = await axios.patch(url, body, {
        headers: {
          Authorization: `Bearer ${cookies.access_token} ${cookies.refresh_token}`,
        },
      });
      setMsg(data.msg);
      setjwt(data.jwt);
      dispatch({ type: "ISAUTH", payload: true });
    } catch (error) {
      setMsg(error.response.data.msg);
      dispatch({ type: "ISAUTH", payload: false });
    }
  };

  // AXIOS DELETE FUNCTION
  const deleteF = async () => {
    try {
      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${cookies.access_token} ${cookies.refresh_token}`,
        },
      });
      setMsg(data.msg);
      setjwt(data.jwt);
      dispatch({ type: "ISAUTH", payload: true });
    } catch (error) {
      setMsg(error.response.data.msg);
      dispatch({ type: "ISAUTH", payload: false });
    }
  };
};

export default usePost;
