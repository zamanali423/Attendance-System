require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const app = express();
const userRouter=require("./router/userRouter/userRouter")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/",userRouter)

//! Database Connection
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connect Database Successfuly");
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
      });
  })
  .catch((error) => {
    console.log(error);
  });
