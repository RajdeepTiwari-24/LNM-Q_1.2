const mongoose = require("mongoose");

const ReplySchema = mongoose.Schema({

      text: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    },
    {
      timestamps: true,
  
    });

module.exports = mongoose.model("Reply", ReplySchema);
