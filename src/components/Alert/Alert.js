import React from "react";
import MuiAlert from "@material-ui/lab/MuiAlert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default Alert;
