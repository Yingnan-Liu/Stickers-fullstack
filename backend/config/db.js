// 连接数据库
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); //链接mongoDB数据库
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    mongoose.connect.close();
    process.exit(1); //终止进程
  }
};

module.exports = connectDB;
