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
    if (!component) {
      if (state.title === "admin") {
        navigate("/teachers");
      }
      if (state.title === "teacher") {
        navigate("/lessons");
      }
    }
    setComponentURL(component);
  }, [component, state.title]);
  return componentURL;
};

export default useComponent;
