import { useEffect } from "react";
// NPMS
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const useRedirect = () => {
  const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["refresh_token", "isAuth"]);
    console.log(cookies.isAuth);
  useEffect(() => {
    if (cookies.isAuth && cookies.isAuth === "false") {
      navigate("/login");
    }
  }, [cookies.isAuth]);
};

export default useRedirect;
