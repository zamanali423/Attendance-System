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
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

// userSchema.methods.generateToken = async function () {
//   try {
//     const secretKey = process.env.SECRET_KEY;
//     const token = await jwt.sign(
//       { _id: this._id, email: this.email },
//       secretKey,
//       { expiresIn: "30d" }
//     );
//     this.tokens = this.tokens.concat({ token });
//     await this.save();
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// };

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password") || this.isModified("confirm")) {
//     this.password = await bcrypt.hash(this.password, 12);
//     this.confirm = await bcrypt.hash(this.confirm, 12);
//   }
//   next();
// });

module.exports = mongoose.model("users", userSchema);
