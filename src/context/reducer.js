let username = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).name
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).token
  : "";

export const initialState = {
  username: "" || username,
  token: "" || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        username: action.payload.name,
        token: action.payload.token,
        loading: false,
        errorMessage: null,
      };
    case "LOGOUT":
      return {
        ...initialState,
        username: "",
        token: "",
      };
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    case "ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
