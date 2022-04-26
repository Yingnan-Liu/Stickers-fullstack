import axios from "axios";
const baseUrl = "http://localhost:5000";

export async function loginUser(dispatch, loginPayload) {
  try {
    let response = await axios.post(baseUrl + "/api/users/login", loginPayload);
    let data = response.data;
    if (data) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
      return data;
    }
  } catch (error) {
    console.log("action err", error.response.data.message);
    dispatch({ type: "LOGIN_ERROR", error: error.response.data.message });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" }); //initialState制空
  localStorage.removeItem("currentUser");
}
