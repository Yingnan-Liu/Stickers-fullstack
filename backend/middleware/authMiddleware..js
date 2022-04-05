// 检验token的中间件
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // 从请求头部拿到authorization(由Bearer空格token组成）,并判断是否以“bearer"开头
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      console.log("token:", token);
      //verify token 从token中得到payload（user.id，生成的时候输入的 可以是其他值，也会被解析出来）
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded:", decoded);
      // get user from token
      req.user = await User.findById(decoded.id).select("-password"); //通过user.id查找出user然后去掉password属性
      console.log("req.user : ", req.user);

      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  //
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
