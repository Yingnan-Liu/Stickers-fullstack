const mongoose = require("mongoose");

//1.创建note schema
const noteSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

//2. 根据schema创建Note model
module.exports = mongoose.model("Note", noteSchema);
