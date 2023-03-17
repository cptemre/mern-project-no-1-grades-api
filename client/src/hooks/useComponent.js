import { useEffect, useState, useContext } from "react";

// COMPONENTS
import { Context } from "../data/Context";

// NPMS
import { useNavigate, useParams } from "react-router-dom";

const useComponent = () => {
  const { state } = useContext(Context);
  const navigate = useNavigate();
  const { component } = useParams();
  const [componentURL, setComponentURL] = useState("");

  // IF SUB LINK NOT DECIDED THEN AUTO START FOR ADMIN IS FROM TEACHERS
  useEffect(() => {
    if (
      state.title === "admin" &&
      component !== "teachers" &&
      component !== "students" &&
      component !== "lessons" &&
      component !== "teacher" &&
      component !== "student"
    ) {
      navigate("/teachers");
    }
    if (state.title === "teacher") {
      navigate("/lessons?semester=1");
    }
    if (state.title === "student") {
      navigate("/grades?semester=1");
    }
    setComponentURL(component);
  }, [component, state.title]);
  return componentURL;
};

export default useComponent;
