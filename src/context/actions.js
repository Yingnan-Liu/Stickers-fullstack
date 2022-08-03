import axios from "axios";
const baseUrl = "/api/users";



export async function loginUser(dispatch, loginPayload) {
  // try {
    let response = await axios.post(baseUrl + "/login", loginPayload);
    let data = response.data;
    if (data) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
      return data;
    }
  // } catch (error) {
  //   console.log("action err", error.response.data.message);
  //   dispatch({ type: "LOGIN_ERROR", error: error.response.data.message });
  // }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" }); //initialState制空
  localStorage.removeItem("currentUser");
}

export async function signUpUser(dispatch,signUpPayload){
  const response = await axios.post(baseUrl + "/signup", signUpPayload);
  const data =response.data
  if(data){
    dispatch({ type: "MESSAGE", error: "注册成功！✨" });
    // localStorage.setItem("currentUser", JSON.stringify(data));
    return data
  }
}