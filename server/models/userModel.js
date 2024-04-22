const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  year:{
    type: String,
    required:true
  },
  branch: {
    type: String,
    required:true
  },
  verified:{
    type: Boolean,
    default:false
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]

});

module.exports = mongoose.model("User", userSchema);
