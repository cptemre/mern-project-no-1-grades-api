import { useEffect, useState } from "react";

const useLoad = () => {
  // SHOULD I LOAD?
  const [isLoad, setIsLoad] = useState(false);
  // UNTIL STATE OR ISLOAD GETS READ SHOW LOADING SCREEN THEN SHOW PAGE OR LOGIN DEPENDS ON AUTHORIZATION
  useEffect(() => {
    if (!isLoad) {
      load();
    }
  }, [isLoad]);
  const load = () => {
    setTimeout(() => {
      setIsLoad(true);
    }, 1000);
  };
  return isLoad;
};

export default useLoad;
