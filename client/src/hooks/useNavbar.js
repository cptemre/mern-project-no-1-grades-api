import {useEffect} from 'react'

// NPMS
import $ from 'jquery'

const useNavbar = (title, component,isLoad) => {
  // SET SELECTED BUTTON COLOR
  useEffect(() => {
    if ((title, component, isLoad)) {
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
  }, [title, component, isLoad]);
}

export default useNavbar