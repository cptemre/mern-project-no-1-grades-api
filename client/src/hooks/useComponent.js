import { useEffect, useState } from "react";

// NPMS
import { useNavigate, useParams } from "react-router-dom";

const useComponent = () => {
  const navigate = useNavigate();
  const { component } = useParams();
  const [componentURL, setComponentURL] = useState("");

  // IF SUB LINK NOT DECIDED THEN AUTO START FOR ADMIN IS FROM TEACHERS
  useEffect(() => {
    if (!component) {
      navigate("/teachers");
    }
    setComponentURL(component);
  }, [component]);
  return componentURL;
};

export default useComponent;
