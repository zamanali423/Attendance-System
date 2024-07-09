const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requiredd: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
});

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password") || this.isModified("confirm")) {
//     this.password = await bcrypt.hash(this.password, 12);
//     this.confirm = await bcrypt.hash(this.confirm, 12);
//   }
//   next();
// });

module.exports = mongoose.model("users", userSchema);
