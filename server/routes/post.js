const Post = require("../models/postModel");
const User = require("../models/userModel");
const Reply = require("../models/replyModel");

const router = require("express").Router();

router.get("/allposts", async (req, res, next) => {
  try {
    const allPosts = await Post.find().populate("userId");
    allPosts.reverse();
    //console.log(allPosts);
    return res.status(200).json(allPosts);
  } catch (ex) {
    next(ex);
  }
});

router.post("/allposts", async (req, res, next) => {
  try {
    const {postId, userId} =req.body;
    const post = await Post.findOne({ _id: postId });
    if (!post) {
        return res.status(404).json({ status: false, msg: "Post not found" });
    }
    
    const index = post.likes.indexOf(userId);
    if (index === -1) {
        post.likes.push(userId);
    } else {
        post.likes.splice(index, 1);
    }
    await post.save();
    return res.json({status:true, likes: post.likes}); 
  } catch (ex) {
    next(ex);
  }
});

router.get("/allposts/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findOne({ _id: postId }).populate("replies");
    if (!post) {
      return res.status(404).json({ status: false, msg: "Post not found" });
    }
    post.replies.reverse();
    return res.json({post, status:true, msg:"Reply added successfully"});
  } catch (ex) {
    next(ex);
  }
});

router.post("/allposts/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;
    const post = await Post.findOne({ _id: postId }).populate("replies");
    if (!post) {
      return res.status(404).json({ status: false, msg: "Post not found" });
    }
    const index = post.likes.indexOf(userId);
    if (index === -1) {
        post.likes.push(userId);
    } else {
        post.likes.splice(index, 1);
    }
    await post.save();
    return res.json({status:true, likes: post.likes}); 
  } catch (ex) {
    next(ex);
  }
});


router.post("/addpost", async (req, res, next) => {
  try {
    const username = req.body.currusername;
    const userId= req.body.currUserId;
    const {text,topic} = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ status:false, msg: "User not found" });
    }
    const post = await Post.create({
      text,
      topic,
      username,
      userId
    });
    user.posts.push(post._id);
    await user.save();

    return res.json({ status: true, post });
  } catch (ex) {
    next(ex);
  }
});

router.post("/deletepost", async(req,res,next) =>{
  try{
    const postId= req.body.postId;
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({ status:false, msg: "Post not found" });
    }
    const userId=post.userId;
    await Reply.deleteMany({ _id: { $in: post.replies } });
    
    await Post.deleteOne({ _id: postId });

    const user = await User.findOne({ _id: userId });
    if (!user) {
     return res.status(404).json({ status: false, msg: "User not found" });
    }
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();

    return res.json({ status: true, msg: "Post deleted successfully" });

  } catch (ex){
    next(ex);
  }
});




module.exports = router;
