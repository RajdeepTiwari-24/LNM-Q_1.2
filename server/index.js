const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary =require("cloudinary");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const replyRoutes = require("./routes/reply");
const userRoutes = require ("./routes/user");
const forgotpasswordRoutes = require('./routes/forgotpassword');
const cors = require("cors");

const app = express();
require("dotenv").config();
app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
})
  
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/reply", replyRoutes);
app.use("/api/user", userRoutes);
app.use("/api/password",forgotpasswordRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
