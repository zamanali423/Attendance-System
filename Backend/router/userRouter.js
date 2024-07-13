const express = require("express");
const router = express.Router();
const User = require("../../database/users/Users");
const Student = require("../../database/students/Students");
const bcrypt = require("bcryptjs");
const { z } = require("zod");
const { generateToken } = require("../../authentication/GenerateToken");
const { authenticate } = require("../../middlewares/AuthMiddleware");
const {
  userRegistrationSchema,
  userLoginSchema,
} = require("../../validation/usersValidation/userValidation");

router.get("/register", (req, res) => {
  res.send("user data here");
});

//! User registration route
router.post("/register/newUser", async (req, res) => {
  try {
    // Validate request body
    const userData = userRegistrationSchema.parse(req.body);

    const { fullName, email, password, confirmPassword, role, profilePicture } =
      userData;

    // Check if email already exists
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Hash passwords
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    // Create new user instance
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      role,
      profilePicture,
    });

    // Save user to database
    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser);

    // Return success response with token and user details
    return res
      .status(201)
      .json({ error: "Register successfully", user: newUser, token });
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const firstErrorMessage = error.errors[0]?.message || "Validation error";
      return res.status(400).json({ error: firstErrorMessage });
    }
    // Handle other internal server errors
    return res
      .status(500)
      .json({ error: "Internal Server Error", error: error.message });
  }
});

//! User login route
router.post("/Login/User", async (req, res) => {
  try {
    // Validate request body
    const loginData = userLoginSchema.parse(req.body);

    const { email, password, confirmPassword } = loginData;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Email does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const token = generateToken(user);
    return res.status(200).json({ error: "Login successful", user, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Extract the first error message
      const firstErrorMessage = error.errors[0]?.message || "Validation error";
      return res.status(400).json({ error: firstErrorMessage });
    }
    return res.status(500).json({ error: "Internal Server Error", error });
  }
});

//! Students Attendance
router.post("/Attendance/Student", async (req, res) => {
  const { date, status, fullName, email, request } = req.body;

  try {
    const user = await User.findOne({ email, fullName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
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
    return res.status(500).json({ error: "Internal Server Error", error });
  }
});

//! Do leave request
router.post("/Attendance/Student/request", async (req, res) => {
  const { date, fullName, email, request } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const attendance = new Student({ date, fullName, email, request });
    await attendance.save();
    return res.status(200).json(attendance);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", error });
  }
});

//! Show student data
router.get("/Student/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const student = await Student.find({ email });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", error });
  }
});

//! get user
router.get("/auth/user/getUser", authenticate, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user);
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
