const Reply = require("../models/replyModel");
const Post = require("../models/postModel");
const User = require("../models/userModel")
const router = require("express").Router();
const sendEmail = require("../utils/sendEmail");

router.post("/addreply", async (req, res, next) => {
  try {
      const username = req.body.currUsername;
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

      const userWhoPosted = await Post.findOne({"_id":postId});
      const userWhoPostedId = userWhoPosted.userId;
      const user = await User.findOne({_id:userWhoPostedId});
      const email = user.email;
      post.replies.reverse();
      const link = `http://localhost:3000/posts/${postId}`;
      const msg = `
      <html>
      <body style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p>Dear ${user.username},</p>
          <p>We wanted to let you know that someone has replied to your post.
          <p>You can view the reply and continue the discussion by clicking the link below:</p>
          <p><a href="${link}" style="font-weight: bold; color: #007bff; text-decoration: none;">View Reply</a></p>
          <p>If you did not expect this notification, please ignore this email. If you have any concerns, feel free to reach out to our support team.</p>
          <p>Thanks,</p>
          <p>The LNMQ Development Team</p>
        </div>
      </body>
    </html>`;
      await sendEmail(email, "Reply on your Post", msg);
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
