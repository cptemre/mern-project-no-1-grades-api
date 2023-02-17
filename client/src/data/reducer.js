const reducer = (state, action) => {
    if (action.type === "ID") {
      return { ...state, ID: action.payload };
    }
    if (action.type === "NAME") {
      return { ...state, name: action.payload };
    }
    if (action.type === "SURNAME") {
      return { ...state, surname: action.payload };
    }
    if (action.type === "EMAIL") {
        return { ...state, email: action.payload };
    }
    if (action.type === 'TITLE') {
        return {...state, title: action.payload}
    }
    if (action.type === "MSG") {
      return { ...state, msg: action.payload };
    }
    if (action.type === "ACCESS_TOKEN") {
      return { ...state, access_token: action.payload };
    }
  if (action.type === "ISAUTH") {
    return { ...state, isAuth: action.payload };
  }
    return state
}

const defaultState = {
  ID: "",
  name: "",
  surname: "",
  email: "",
  title: "",
  msg: "",
  access_token: "",
  isAuth: ''
};

export {reducer,defaultState}