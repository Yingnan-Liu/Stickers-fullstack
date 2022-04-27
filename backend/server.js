const express = require("express");
const dotenv = require("dotenv").config(); //环境变量 allow a .env file with our enviroment variables in it
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const port = process.env.PORT || 5000;
connectDB(); //连接数据库
const app = express();

app.use(express.json()); //解析req.body
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/users", userRouter);

// here goes middleware
app.use(errorHandler); //重写express的errhandler

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});
