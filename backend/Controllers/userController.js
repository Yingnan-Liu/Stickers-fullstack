const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
// @desc  注册用户
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // 拿到body数据
  const { name, password, email } = req.body;
  // check 是否为空 前端做测试吧
  // check user 是否存在 根据email查找
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(401);
    throw new Error("用户已存在，请登录");
  }
  //对密码进行加密
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // 创建用户
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("用户信息无效");
  }
});

// @desc  登录 authentication
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  // 邮箱和密码登录
  const { email, password } = req.body;
  // 根据邮箱查询数据库中的user
  const user = await User.findOne({ email });
  // 如果用户存在并且输入的密码和数据库中的密码校验通过

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else if (!user) {
    res.status(400);
    throw new Error("邮箱未注册");
  } else if (!(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("密码错误，请重新输入");
  }
});

// @desc  用户信息 get user data
// @route GET /api/users/me
// @access Public
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "Get User data" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
