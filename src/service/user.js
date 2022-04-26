import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
const baseUrl = "http://localhost:5000";

const api = {
  signup: `${baseUrl}/api/users/signup`,
};

export const signUp = (data) => {
  return axios.post(api.signup, { ...data });
};
