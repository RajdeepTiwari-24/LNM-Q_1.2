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
          return res.json(user);
        
    } catch (ex) {
      next(ex);
    }
});


module.exports = router;