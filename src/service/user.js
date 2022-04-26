import axios from "axios";
const baseUrl = "http://localhost:5000";

const api = {
  signup: `${baseUrl}/api/users/signup`,
  signin: `${baseUrl}/api/users/login`,
};

export const signUp = (data) => {
  return axios.post(api.signup, { ...data });
};

export const signIn = (data) => {
  return axios.post(api.signin, { ...data });
};
