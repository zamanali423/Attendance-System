require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const app = express();
const userRouter = require("./router/userRouter/userRouter");
const adminRouter = require("./router/userRouter/adminPanel");

app.use(
  cors({
    origin: ["https://attendance-system-pied-seven.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", userRouter);
app.use("/admin", adminRouter);

//! Database Connection
mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connect Database Successfuly");
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
