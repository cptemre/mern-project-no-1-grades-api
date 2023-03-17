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
  if (action.type === "TEACHERS_DATA") {
    return { ...state, teachersData: action.payload };
  }
  if (action.type === "TEACHERS_LENGTH") {
    return { ...state, teachersLength: action.payload };
  }
  if (action.type === "STUDENTS_DATA") {
    return { ...state, studentsData: action.payload };
  }
  if (action.type === "STUDENTS_LENGTH") {
    return { ...state, studentsLength: action.payload };
  }
  if (action.type === "STUDENT_NO_DATA") {
    return { ...state, studentNoData: action.payload };
  }
  if (action.type === "LESSONS_DATA") {
    return { ...state, lessonsData: action.payload };
  }
  if (action.type === "BRANCHES_DATA") {
    return { ...state, branchesData: action.payload };
  }
  if (action.type === "SEARCH_OPTIONS") {
    return { ...state, searchOptions: action.payload };
  }
  if (action.type === "IS_NAVBAR") {
    return { ...state, isNavbar: action.payload };
  }
  if (action.type === "IS_SEMESTER") {
    return { ...state, isSemester: action.payload };
  }
  if (action.type === "IS_LOADING") {
    return { ...state, isLoading: action.payload };
  }
  if (action.type === "IS_FETCH") {
    return { ...state, isFetch: action.payload };
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
  teachersData: "",
  teachersLength: "",
  studentsData: "",
  studentNoData: "",
  lessonsData: "",
  branchesData: "",
  url: {
    teachers: "/api/v1/teachers",
    teachersLength: "/api/v1/length/teachersLength",
    studentsLength: "/api/v1/length/studentsLength",
    user: { sign_in: "/api/v1/user/sign_in" },
    students: "/api/v1/students",
    lessons: "/api/v1/lessons",
    branches: "/api/v1/lessons/branches",
  },
  searchOptions: { NAME: "", SURNAME: "", EMAIL: "", CREATEDAT: "" },
  isNavbar: false,
  isSemester: false,
  isLoading: true,
  isFetch: false,
};

export { reducer, defaultState };
