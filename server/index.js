const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const replyRoutes = require("./routes/reply");
const userRoutes = require ("./routes/user");
const cors = require("cors");

const app = express();
require("dotenv").config();
app.use(cors());
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

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/reply", replyRoutes);
app.use("/api/user", userRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
