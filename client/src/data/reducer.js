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
  if (action.type === "TITLE") {
    return { ...state, title: action.payload };
  }
  if (action.type === "MSG") {
    return { ...state, msg: action.payload };
  }
  if (action.type === "DATA") {
    return { ...state, data: action.payload };
  }
  if (action.type === "TEACHER_DATA") {
    return { ...state, teacherData: action.payload };
  }
  if (action.type === "STUDENT_DATA") {
    return { ...state, studentData: action.payload };
  }
  if (action.type === "SEARCH_OPTIONS") {
    return { ...state, searchOptions: action.payload };
  }
  if (action.type === "IS_NAVBAR") {
    return { ...state, isNavbar: action.payload };
  }
  if (action.type === "SELECTED_SEMESTER") {
    return { ...state, selectedSemester: action.payload };
  }
  if (action.type === "IS_SEMESTER") {
    return { ...state, isSemester: action.payload };
  }
  return state;
};

const defaultState = {
  ID: "",
  name: "",
  surname: "",
  email: "",
  title: "",
  msg: "",
  data: "",
  teacherData: "",
  studentData: "",
  url: {
    teachers: "/api/v1/teachers",
    user: { sign_in: "/api/v1/user/sign_in" },
    students: "/api/v1/students",
  },
  searchOptions: { NAME: "", SURNAME: "", EMAIL: "", CREATEDAT: "" },
  isNavbar: false,
  selectedSemester: 1,
  isSemester: false,
};

export { reducer, defaultState };
