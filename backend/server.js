const express = require("express");
const dotenv = require("dotenv").config(); //环境变量 allow a .env file with our enviroment variables in it
const port = process.env.PORT || 5000;

const app = express();

app.use("/api/notes", require("./Routes/noteRoutes"));

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});
