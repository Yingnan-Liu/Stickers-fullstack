// @desc   Get notes
// @route GET /api/goals
// @access Private
const getNotes = (req, res) => {
  res.status(200).json({
    message: "get successed",
  });
};

// @desc   Set notes
// @route POST /api/goals
// @access Privat
const setNote = (req, res) => {
  res.status(200).json({
    message: "post successed",
  });
};

// @desc   update notes
// @route PUT /api/goals/:id
// @access Private
const updateNote = (req, res) => {
  res.status(200).json({
    message: `put successed id: ${req.params.id}`,
  });
};
// @desc   delete notes
// @route DELETE /api/goals/:id
// @access Private
const deleteNote = (req, res) => {
  res.status(200).json({
    message: `delete successed id: ${req.params.id}`,
  });
};

module.exports = {
  getNotes,
  setNote,
  updateNote,
  deleteNote,
};
