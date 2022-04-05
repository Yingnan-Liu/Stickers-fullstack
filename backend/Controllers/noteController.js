const asyncHandler = require("express-async-handler"); //express中使用async await
const Note = require("../models/noteModel"); //导入Note model 可以通过Note调用各种mongoose方法 增删查改
// @desc   Get notes
// @route GET /api/goals
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find(); //拿到所有的notes
  res.status(200).json(notes);
});

// @desc   Set notes
// @route POST /api/goals
// @access Privat
const setNote = asyncHandler(async (req, res) => {
  console.log(`post data req.body: ${req.body}`);
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const note = await Note.create({
    text: req.body.text,
  });
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
  // 删除note
  await note.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getNotes,
  setNote,
  updateNote,
  deleteNote,
};
