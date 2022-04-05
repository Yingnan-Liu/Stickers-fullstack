// @desc  注册用户
// @route POST /api/users
// @access Public
const registerUser = (req, res) => {
  res.json({
    message: "Register user",
  });
};

// @desc  登录 authentication
// @route POST /api/users/login
// @access Public
const loginUser = (req, res) => {
  res.json({ message: "Login User" });
};

// @desc  用户信息 get user data
// @route GET /api/users/me
// @access Public
const getMe = (req, res) => {
  res.json({ message: "Get User data" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
