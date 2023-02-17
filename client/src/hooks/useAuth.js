import { useEffect, useContext } from "react";
// COMPONENTS
import { Context } from "../components/Context";
// NPMS
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useAuth = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["refresh_token"]);
  const { state, dispatch } = useContext(Context);
    useEffect(() => {
      console.log(state.isAuth);
    if (state.isAuth) {
      dispatch({ type: "ACCESS_TOKEN", payload: "" });
      dispatch({ type: "ISAUTH", payload: "" });
      setCookie("refresh_token", "");
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [state.isAuth]);
};

export default useAuth;
