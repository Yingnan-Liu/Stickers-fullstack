const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController.js");

// 新建用户 (注册)
router.post("/", registerUser);
// 登录 鉴权
router.post("/login", loginUser);
// 获取当前用户信息
router.get("/me", getMe);

module.exports = router;
