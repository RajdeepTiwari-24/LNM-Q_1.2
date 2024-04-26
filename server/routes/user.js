const User = require("../models/userModel")
const router = require("express").Router();




router.get("/getuser/:userId", async (req, res, next) => {
    try {
       // console.log('user backend');
        const userId = req.params.userId;
        //console.log(userId);
        const user = await User.findOne({ _id: userId }).populate("posts");
        if (!user) {
            return res.status(404).json({ status: false, msg: "User not found" });
          }
         // console.log('user backend 1');
        const populatedUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            year: user.year,
            branch: user.branch,
            posts: user.posts.map((post) => ({
              _id: post._id,
              text: post.text,
              topic: post.topic,
              username: post.username,
              userId: post.userId,
              replies: post.replies,
              likes: post.likes,
              createdAt: post.createdAt
            })),
          };
         // console.log(populatedUser);
          return res.json(populatedUser);
        
    } catch (ex) {
      next(ex);
    }
});


module.exports = router;