const Reply = require("../models/replyModel");
const Post = require("../models/postModel");
const User = require("../models/userModel")
const router = require("express").Router();


router.post("/addreply", async (req, res, next) => {
  try {
      const username = req.body.currusername;
      const text = req.body.text;
      const postId= req.body.postId;
      const userId= req.body.userId;     
      const reply= await Reply.create({
          text,
          username,
          userId
        });
      const post = await Post.findOneAndUpdate(
          { _id: postId },
          { $push: { replies: reply._id } },
          { new: true } 
      ).populate("replies");
      post.replies.reverse();
      return res.json({ status: true, post });
  } catch (ex) {
      next(ex);
  }
});


router.post("/deletereply", async (req, res, next) => {
  try {
      const postId = req.body.postId;
      const replyId = req.body.replyId;
      await Reply.deleteOne({ _id: replyId });
      const post = await Post.findOneAndUpdate(
          { _id: postId },
          { $pull: { replies: replyId } },
          { new: true } 
      ).populate("replies");

      if (!post) {
          return res.status(404).json({ status: false, msg: "Post not found" });
      }
      post.replies.reverse();
      return res.json({ status: true, msg: "Reply deleted successfully", post });
  } catch (ex) {
      next(ex);
  }
});



module.exports = router;
