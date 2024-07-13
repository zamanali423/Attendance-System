const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  request: {
    type: String,
  },
});

module.exports = mongoose.model("students", studentSchema);
