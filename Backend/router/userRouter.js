const express = require("express");
const router = express.Router();
const User = require("../../database/users/Users");
const Student = require("../../database/students/Students");
const bcrypt = require("bcryptjs");

router.get("/register", (req, res) => {
  res.send("user data here");
});

//! Register user
router.post("/register/newUser", async (req, res) => {
  const { fullName, email, password, confirmPassword, role, profilePicture } =
    req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  try {
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(409).json({ msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      role,
      profilePicture,
    });

    await newUser.save();
    return res.status(201).json({ msg: "Register successfully", newUser });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
});

//! Login user
router.post("/Login/User", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "Email does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    const isconfirmPassword = await bcrypt.compare(
      confirmPassword,
      user.confirmPassword
    );
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }
    if (isMatch !== isconfirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
    return res.status(200).json({ msg: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
});

//! Students Attendance
router.post("/Attendance/Student", async (req, res) => {
  const { date, status, fullName, email, request } = req.body;

  try {
    const user = await User.findOne({ email, fullName });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const attendance = new Student({
      date,
      status,
      fullName: user.fullName,
      email: user.email,
      request,
    });

    await attendance.save();
    return res.status(201).json(attendance);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
});

//! Do leave request
router.post("/Attendance/Student/request", async (req, res) => {
  const { date, fullName, email, request } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const attendance = new Student({ date, fullName, email, request });
    await attendance.save();
    return res.status(200).json(attendance);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
});

//! Show student data
router.get("/Student", async (req, res) => {
  try {
    const student = await Student.find();
    if (!student) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
});

module.exports = router;
