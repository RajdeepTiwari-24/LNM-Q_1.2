const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({

      text: {
        type: String,
        required: true
      },
      topic:{
        type: String,
        required:true
      },
      username: {
        type: String,
        required: true
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      replies:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
      }],
      likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]
      },


    {
      timestamps: true,
    }
  
);

module.exports = mongoose.model("Post", PostSchema);
