import { useEffect, useContext } from "react";

// COMPONENTS
import { Context } from "../data/Context";

// NPMS
import $ from "jquery";

const useNavbar = (component, isLoad) => {
  // CONTEXT
  const {state} = useContext(Context)
  // SET SELECTED BUTTON COLOR
  useEffect(() => {
    if ((state.title, component, isLoad)) {
      $(".option").css({
        backgroundColor: "var(--optionBg)",
        color: "black",
        transform: "translateX(-10px)",
      });
      $(`#${component}Option`).css({
        backgroundColor: "var(--inputBorder)",
        color: "white",
        transform: "translateX(-3px)",
      });
    }
  }, [state.title, component, isLoad]);
};

export default useNavbar;
