const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const todoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Todo = mongoose.model("todos", todoSchema);

module.exports = Todo;
