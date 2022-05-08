const asyncHandler = require("express-async-handler"); //express中使用async await
const Note = require("../models/noteModel"); //导入Note model 可以通过Note调用各种mongoose方法 增删查改
const { where } = require("../models/userModel");
const User = require("../models/userModel"); // 导入User model在updateNote中先检查user
// @desc   Get notes
// @route GET /api/goals
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id }); //拿到对应user的notes
  res.status(200).json(notes);
});

// @desc   Set notes
// @route POST /api/goals
// @access Privat
const setNote = asyncHandler(async (req, res) => {
  console.log("setNote收到的数据: ",req.body);
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const note = await Note.create({
    text: req.body.text,
    user: req.user.id,  //添加user信息
  });
  console.log("创建好的note信息:",note)
  res.status(200).json(note);
});

// @desc   update notes
// @route PUT /api/goals/:id
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  // 查看是否存在这个note
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  //检查user是否存在
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('User not found')
  }
  // 检查当前user和note记录的user相同
  if(note.user.toString() !== user.id){   //note的user字段中存的是user model的id属性
    res.status(401)
    throw new Error('User not authorized')
  }


  // 修改note
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); //第三个参数：如果该id不存在就创建一个
  res.status(200).json(updatedNote);
});
// @desc   delete notes
// @route DELETE /api/goals/:id
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  // 查看是否存在这个note
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  //检查user是否存在
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('User not found')
  }
  // 检查当前user和note记录的user相同
  if(note.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized')
  }

  // 删除note
  await note.remove();
  res.status(200).json({ id: req.params.id });
});
// @desc   search notes
// @route post /api/notes/find
// @access Private
const searchNote = asyncHandler(async(req,res)=>{
  console.log("axios发来的数据",req.query)
  const searchText=req.query.text
  const reg=new RegExp(".*"+searchText+".*")
  const notes = await Note.find({text:{$regex:reg}})
 
  res.status(200).json(notes)
})



module.exports = {
  getNotes,
  setNote,
  updateNote,
  deleteNote,
  searchNote
};
