const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
});

module.exports = new mongoose.model("backend_tasks_Shrikant", TodoSchema);