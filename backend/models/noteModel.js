const mongoose = require("mongoose");

//1.创建note schema
const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", //dd reference to User model
    },
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
